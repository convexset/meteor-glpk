// importScripts('extras/glpk.js');
importScripts('glpk.min.js');
importScripts('sol-tools.js');
importScripts('array.includes.js');


self.addEventListener('message', function(e) {

	var lp, problem;

	function sendToMain(payload) {
		postMessage(JSON.stringify(payload));
	}

	function log(value) {
		sendToMain({
			action: 'log',
			message: value
		});
	}

	function mipCBLog(value) {
		sendToMain({
			action: 'log-intopt',
			message: value
		});
	}

	function postsolveLog(value) {
		log(value);
		sendToMain({
			action: 'log-postsolve',
			message: value
		});
	}

	log('\n[glpk.js] Starting...\n');
	glp_set_print_func(log);

	var obj = e.data;
	switch (obj.action) {
		case 'start':
			log('[glpk.js] Loading...\n');
			var result = {
				action: ''
			};
			var sol_lp, sol_mip;
			var ret_lp, ret_mip;
			var num_problems_loaded = 0;
			try {
				if (typeof obj.problem === "string") {
					problem = glpkParseLP.call(self, obj.problem);
					num_problems_loaded += 1;
				}

				if ((typeof obj.model === "string") && (typeof obj.data === "string")) {
					problem = glpkParseMPL.call(self, obj.model, obj.data);
					num_problems_loaded += 1;
				}
				if (num_problems_loaded !== 1) {
					if (num_problems_loaded === 0) {
						throw "invalid-problem-specification";
					} else {
						throw "ambiguous-problem-specification";
					}
				}

				// Start Solve Proper
				lp = problem.lp;

				log('\n[glpk.js] Scaling problem...\n');
				glp_scale_prob(lp, GLP_SF_AUTO);

				log('\n[glpk.js] Solving LP...\n');
				var smcp = new SMCP({
					presolve: GLP_ON
				});
				ret_lp = glp_simplex(lp, smcp);

				log('\n[glpk.js] Getting LP solution...\n');
				sol_lp = glpkGetLPSolution.call(self, lp);
				sol_lp.return_code = ret_lp;

				if (!obj.mip && (problem.type === "MPL")) {
					log('\n[glpk.js] Postsolving with LP solution...\n');
					glp_set_print_func(postsolveLog);
					glp_mpl_postsolve(problem.tran, problem.lp, GLP_SOL);
					glp_set_print_func(log);
					log('\n[glpk.js] Postsolving complete.\n');
				}
				if (!!obj.mip && [GLP_OPT, GLP_FEAS].includes(sol_lp.status)) {
					log('\n[glpk.js] Solving MIP...\n');
					var iocp = new IOCP();

					iocp.cb_func = generate_iocpCallbackFunction(log, mipCBLog);

					if (!!obj.mipParams) {
						for (var key in obj.mipParams) {
							if (iocp.hasOwnProperty(key) && obj.mipParams.hasOwnProperty(key)) {
								iocp[key] = obj.mipParams[key];
								log('[glpk.js] Setting iocp[' + key + '] to ' + obj.mipParams[key] + '...\n');
							}
						}
					}
					ret_mip = glp_intopt(lp, iocp);

					log('\n[glpk.js] Getting MIP solution...\n');
					sol_mip = glpkGetMIPSolution.call(self, lp);
					sol_mip.return_code = ret_mip;

					if (problem.type === "MPL") {
						log('\n[glpk.js] Postsolving with MIP solution...\n');
						glp_set_print_func(postsolveLog);
						glp_mpl_postsolve(problem.tran, problem.lp, GLP_MIP);
						glp_set_print_func(log);
						log('\n[glpk.js] Postsolving complete.\n');
					}
				}

				// All Done
				result.action = 'done';

				result.sol_lp = sol_lp;
				if (!!obj.mip) {
					result.sol_mip = sol_mip;
				}

			} catch (err) {
				result.action = 'error';
				result.error = err.message;
			} finally {
				lp = null;
				sendToMain(result);
				if (result.action === 'done') {
					close();
				}
			}
			break;
	}
}, false);

//////////////////////////////////////////////////////////////////////
// Integer Optimization Callback Function
//////////////////////////////////////////////////////////////////////
function generate_iocpCallbackFunction(logFn, mipCBLogFn) {
	var num_cb = 0;
	return function iocpCallbackFunction(tree, info) {
		var reason = glp_ios_reason(tree);
		var reason_description = "";
		num_cb += 1;
		switch (reason) {
			case GLP_IROWGEN:
				// request for row generation
				reason_description = "request for row generation";
				break;
			case GLP_IBINGO:
				// better integer solution found
				reason_description = "better integer solution found";
				break;
			case GLP_IHEUR:
				// request for heuristic solution
				reason_description = "request for heuristic solution";
				break;
			case GLP_ICUTGEN:
				// request for cut generation
				reason_description = "request for cut generation";
				break;
			case GLP_IBRANCH:
				// request for branching
				reason_description = "request for branching";
				break;
			case GLP_ISELECT:
				// request for subproblem selection
				reason_description = "request for subproblem selection";
				break;
			case GLP_IPREPRO:
				// request for preprocessing
				reason_description = "request for preprocessing";
				break;
			default:
				/* ignore call for other reasons */
				break;
		}

		var gap = glp_ios_relative_gap(tree);
		var lp = glp_ios_get_prob(tree);
		var mip_obj = glp_mip_obj_val(lp);

		mipCBLogFn({
			reason: reason,
			reasonDescription: reason_description,
			gap: gap,
			mipObjective: mip_obj,
			numCallbacks: num_cb,
			iterationCount: lp.it_cnt,
			treeInfo: {
				numActiveNodes: tree.a_cnt,
				numNodes: tree.n_cnt,
				totalNodesIncludingRemoved: tree.t_cnt,
			}
		});

		return;
	};
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////