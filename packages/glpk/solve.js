importScripts('glpk.min.js');
importScripts('sol-tools.js');

self.addEventListener('message', function(e) {

	var lp, problem;

	function log(value) {
		self.postMessage({
			action: 'log',
			message: value
		});
	}

	function postsolveLog(value) {
		self.postMessage({
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
					// (function() {
					// 	// log(obj)
					// 	lp = glp_create_prob();
					// 	var tran = glp_mpl_alloc_wksp();

					// 	ret = glp_mpl_read_model_from_string(tran, null, obj.model);
					// 	if (ret !== 0) {
					// 		throw "error|glp_mpl_read_model_from_string|" + ret;
					// 	}

					// 	ret = glp_mpl_read_data_from_string(tran, null, obj.data);
					// 	if (ret !== 0) {
					// 		throw "error|glp_mpl_read_data_from_string|" + ret;
					// 	}

					// 	ret = glp_mpl_generate(tran, null);
					// 	if (ret !== 0) {
					// 		throw "error|glp_mpl_generate|" + ret;
					// 	}

					// 	log('[glpk.js] Building optimization problem...\n');
					// 	glp_mpl_build_prob(tran, lp);

					// 	problem = {
					// 		type: 'MPL',
					// 		lp: lp,
					// 		tran: tran,
					// 	}
					// })();
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

				if (!!obj.mip) {
					log('\n[glpk.js] Solving MIP solution...\n');
					ret_mip = glp_intopt(lp);

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
				result.error = err;
			} finally {
				lp = null;
				self.postMessage(result);
			}
			break;
	}
}, false);