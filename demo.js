/* global GLPK: true */

if (Meteor.isClient) {
	function operateOnArrayInReactiveVar(rv, op, ...args) {
		var arr = Tracker.nonreactive(rv.get.bind(rv));
		var ret = arr[op].apply(arr, args);
		rv.set(arr);
		return ret;
	}

	[
		Template.DemoLP,
		Template.DemoMPL,
	].forEach(function(tmpl) {
		tmpl.onCreated(function() {
			var instance = this;

			var log = new ReactiveVar([]);
			instance.log = log;
			var cols = new ReactiveVar([]);
			instance.cols = cols;
			var rows = new ReactiveVar([]);
			instance.rows = rows;
			var objective = new ReactiveVar({});
			instance.objective = objective;

			instance.jobBundle = null;
			instance.hasJobBundle = new ReactiveVar(false);
			instance.clear = function clear(init_msg = '') {
				log.set([init_msg]);
				cols.set([]);
				rows.set([]);
			};
			instance.appendToLog = function appendToLog(msg) {
				// console.log('[LOG]', msg);
				return operateOnArrayInReactiveVar(log, 'push', (typeof msg === "string" ? msg : EJSON.stringify(msg)) + '\n');
			};
			instance.appendToCols = function appendToCols(name, value) {
				// console.log('[SOLUTION] ' + name + ':', value);
				return operateOnArrayInReactiveVar(cols, 'push', _.extend({
					name: name
				}, value));
			};
			instance.appendToRows = function appendToRows(name, value) {
				// console.log('[CONSTRAINTS] ' + name + ':', value);
				return operateOnArrayInReactiveVar(rows, 'push', _.extend({
					name: name
				}, value));
			};
		});

		function completionCB(instance, result) {
			console.log('[COMPLETION]', instance.view.name, result);
			if (!!result) {
				[{
					data: result.lp,
					isMIP: false
				}, {
					data: result.mip,
					isMIP: true
				}].forEach(function(items) {
					if (!!items.data) {
						_.forEach(items.data.rows, function(value, name) {
							instance.appendToRows(name, _.extend(value, {
								isMIP: items.isMIP
							}));
						});
						_.forEach(items.data.cols, function(value, name) {
							instance.appendToCols(name, _.extend(value, {
								isMIP: items.isMIP
							}));
						});
					}
				});

				// instance.appendToLog(JSON.stringify(result.result));
				instance.appendToLog('LP Objective Value:  ' + result.lp.objective);
				var objective = {
					LP: result.lp
				};
				if (!!result.mip) {
					instance.appendToLog('MIP Objective Value: ' + result.mip.objective);
					objective.MIP = result.mip;
				}
				instance.objective.set(objective);
			} else {
				console.warn('!!!!', result)
			}

			instance.jobBundle = null;
			instance.hasJobBundle.set(false);
		}

		function errorCB(instance, info) {
			console.log('[ERROR]', instance.view.name, info);
			instance.jobBundle = null;
			instance.hasJobBundle.set(false);
		}

		var INTOPT_EVENTS = [
			GLPK.CONSTANTS.GLP_IBINGO,
			// GLPK.CONSTANTS.GLP_IROWGEN,
			// GLPK.CONSTANTS.GLP_ICUTGEN,
			// GLPK.CONSTANTS.GLP_IBRANCH,
			// GLPK.CONSTANTS.GLP_IHEUR,
			// GLPK.CONSTANTS.GLP_ISELECT,
			// GLPK.CONSTANTS.GLP_IPREPRO,
		];

		function intOptCB(instance, info) {
			if (INTOPT_EVENTS.includes(info.reason)) {
				var message = `[INTOPT|${instance.view.name}|${info.iterationCount}] ${info.reasonDescription}; Obj: ${info.mipObjective} (#cb: ${info.numCallbacks})`;
				console.info(message);
				instance.appendToLog(message);
			}
		}

		tmpl.events({
			'click button.new-problem': function() {
				Template.instance().selectRandomProblem();
			},
			'click button.clear': function() {
				Template.instance().clear();
			},
			'click button.stop': function() {
				if (Template.instance().jobBundle !== null) {
					Template.instance().jobBundle.worker.terminate();
					Template.instance().jobBundle = null;
					Template.instance().hasJobBundle.set(false);
				}
			},
			'click button#go-lp': function() {
				var instance = Template.instance();
				if (instance.jobBundle === null) {
					instance.clear();
					jobBundleLP = GLPK.createWorker(
						msg => instance.appendToLog(msg),
						null,
						_.bind(completionCB, instance, instance),
						_.bind(errorCB, instance, instance),
						_.bind(intOptCB, instance, instance),
					);
					jobBundleLP.solveLP(
						instance.$('#source').val(),
						instance.$('.mip')[0].checked, {
							presolve: instance.$('.presolve')[0].checked ? GLPK.CONSTANTS.GLP_ON : GLPK.CONSTANTS.GLP_OFF,
							tm_lim: 1000 * 60 * 5,
						}
					);
					instance.jobBundle = jobBundleLP;
					instance.hasJobBundle.set(true);
				};
			},
			'click button#go-mpl': function() {
				var instance = Template.instance();
				if (instance.jobBundle === null) {
					instance.clear();
					jobBundleMPL = GLPK.createWorker(
						msg => instance.appendToLog(msg),
						msg => console.info(msg),
						_.bind(completionCB, instance, instance),
						_.bind(errorCB, instance, instance),
						_.bind(intOptCB, instance, instance),
					);
					jobBundleMPL.solveMPL(
						instance.$('#source-model').val(),
						instance.$('#source-data').val(),
						instance.$('.mip')[0].checked, {
							presolve: instance.$('.presolve')[0].checked ? GLPK.CONSTANTS.GLP_ON : GLPK.CONSTANTS.GLP_OFF,
							tm_lim: 1000 * 60 * 5,
						}
					);
					instance.jobBundle = jobBundleMPL;
					instance.hasJobBundle.set(true);
				};
			}
		});

	});


	[
		Template.DemoLP,
		Template.DemoMPL,
		Template.ShowSolution
	].forEach(function(tmpl) {
		tmpl.helpers({
			log: () => Template.instance().log.get(),
			solutions: function() {
				var instance = Template.instance();
				var sols = [];

				var lp_sol = {
					type: "LP",
					cols: instance.cols.get().filter(x => !x.isMIP),
					rows: instance.rows.get().filter(x => !x.isMIP)
				};
				sols.push(lp_sol);

				var mip_sol = {
					type: "MIP",
					cols: instance.cols.get().filter(x => !!x.isMIP),
					rows: instance.rows.get().filter(x => !!x.isMIP)
				};
				if (mip_sol.cols.length + mip_sol.rows.length > 0) {
					sols.push(mip_sol);
				}
				console.log('[SOLS]', sols)
				return sols;
			},
			haveSolution: () => (Template.instance().cols.get().length > 0),
			objective: () => _.map(Template.instance().objective.get(), function(item, name) {
				console.log(name, item)
				var direction = GLPK.getCodeDescription("optimization direction flag", item.optimization_direction);
				var status = GLPK.getCodeDescription("solution status", item.status);
				var primal_status = GLPK.getCodeDescription("solution status", item.primal_stat);
				var dual_status = GLPK.getCodeDescription("solution status", item.dual_stat);
				var return_code = GLPK.getCodeDescription("return codes", item.return_code);
				return {
					name: name,
					value: item.objective,
					direction: direction && direction.description || "???",
					status: status && status.description || "???",
					primal_status: primal_status && primal_status.description || "???",
					dual_status: dual_status && dual_status.description || "???",
					return_code: return_code && return_code.description || "???",
				};
			}),
			readyForJob: () => Template.instance().jobBundle === null,
			hasJob: () => Template.instance().jobBundle !== null,
			goButtonState: () => Template.instance().jobBundle === null ? "" : "disabled",
			stopButtonState: () => Template.instance().jobBundle !== null ? "" : "disabled",
			varType: val => GLPK.getCodeDescription("type of auxiliary/structural variable", val).description,
			varStatus: val => GLPK.getCodeDescription("status of auxiliary/structural variable", val).description,
			colKind: val => GLPK.getCodeDescription("kind of structural variable", val).description,
		});
	});

	Template.DemoLP.onCreated(function() {
		var instance = this;
		instance.selectRandomProblem = function selectRandomProblem() {
			instance.clear('Ready...\n');
			instance.$("#source").val(lpSampleProblems[Math.floor(lpSampleProblems.length * Math.random())]);
		};
	});

	Template.DemoLP.onRendered(function() {
		var instance = this;
		instance.selectRandomProblem();
	});

	Template.DemoMPL.onCreated(function() {
		var instance = this;
		instance.selectRandomProblem = function selectRandomProblem() {
			instance.clear('Ready...\n');
			var problem = mplSampleProblems[Math.floor(mplSampleProblems.length * Math.random())];
			instance.$("#source-model").val(problem.model);
			instance.$("#source-data").val(problem.data);
		};
	});

	Template.DemoMPL.onRendered(function() {
		var instance = this;
		instance.selectRandomProblem();
	});

}