import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
  'package-utils': '^0.2.1'
});
const PackageUtilities = require('package-utils');


var _glpk = function GLPK() {}
GLPK = new _glpk();

PackageUtilities.addImmutablePropertyValue(GLPK, "MAJOR_VERSION", 4);
PackageUtilities.addImmutablePropertyValue(GLPK, "MINOR_VERSION", 49);
PackageUtilities.addImmutablePropertyFunction(GLPK, "version", function version() {
	return GLPK.MAJOR_VERSION + "." + GLPK.MINOR_VERSION;
});

PackageUtilities.addImmutablePropertyObject(GLPK, "CONSTANTS", _.object(
	_.map(CONSTANTS, (c, k) => [k, c.value])
));
PackageUtilities.addImmutablePropertyObject(GLPK, "LPX_CONSTANTS", _.object(
	_.map(LPX_CONSTANTS, (c, k) => [k, c.value])
));
PackageUtilities.addImmutablePropertyObject(GLPK, "CONSTANT_DESCRIPTION", _.object(
	_.map(CONSTANTS, (c, k) => [k, c.description])
	.concat(_.map(LPX_CONSTANTS, (c, k) => [k, c.description]))
));
PackageUtilities.addPropertyGetter(GLPK, "CONSTANT_CLASSES", () => PackageUtilities.deepCopy(CONSTANT_CLASSES_DICT));
PackageUtilities.addImmutablePropertyFunction(GLPK, "getCodeDescription", function(type, value) {
	var items = _.map(CONSTANT_CLASSES_DICT[type] || [], (v, k) => _.extend({
		name: k,
		description: "[Not Found]",
		value: "[Not Found]",
	}, v)).filter(item => item.value === value);
	return items.pop();
});

function primalSolutionValueLP(_solution) {
	if (!!_solution) {
		return _.map(_solution.sol_lp.cols, c => c.objCoeff * c.primal).reduce((x, y) => x + y, 0);
	} else {
		throw new Meteor.Error('no-solution');
	}
}

function dualSolutionValueLP(_solution) {
	if (!!_solution) {
		return (_.map(_solution.sol_lp.rows, r => r.primal * r.dual).reduce((x, y) => x + y, 0) + _.map(_solution.sol_lp.cols, c => (c.primal === c.ub ? c.ub * c.dual : 0) + (c.primal === c.lb ? c.lb * c.dual : 0)).reduce((x, y) => x + y, 0));
	} else {
		throw new Meteor.Error('no-solution');
	}
}

function primalSolutionValueMIP(_solution) {
	if (!!_solution) {
		if (_solution.sol_mip) {
			return _.map(_solution.sol_mip.cols, c => c.objCoeff * c.primal).reduce((x, y) => x + y, 0);
		} else {
			throw new Meteor.Error('no-mip-solution');
		}
	} else {
		throw new Meteor.Error('no-solution');
	}
}

PackageUtilities.addImmutablePropertyFunction(GLPK, "createWorker", function createWorker(loggingCB, postsolveLoggingCB, completionCB, errorCB, intOptCB) {
	var _solution;
	var worker = new Worker("/packages/convexset_glpk/solve.js");
	var started = false;
	worker.onmessage = function(e) {
		var obj = JSON.parse(e.data);
		switch (obj.action) {
			case 'log':
				if (_.isFunction(loggingCB)) {
					setTimeout(function() {
						loggingCB(obj.message);
					}, 0);
				}
				break;
			case 'log-intopt':
				if (_.isFunction(intOptCB)) {
					setTimeout(function() {
						intOptCB(obj.message);
					}, 0);
				}
				break;
			case 'log-postsolve':
				if (_.isFunction(postsolveLoggingCB)) {
					setTimeout(function() {
						postsolveLoggingCB(obj.message);
					}, 0);
				}
				break;
			case 'error':
				worker.terminate();
				if (_.isFunction(errorCB)) {
					setTimeout(function() {
						errorCB(obj);
					}, 0);
				}
				break;
			case 'done':
				worker.terminate();
				_solution = {
					lp: obj.sol_lp,
					mip: obj.sol_mip,
				}
				if (_.isFunction(completionCB)) {
					setTimeout(function() {
						completionCB(PackageUtilities.deepCopy(_solution));
					}, 0);
				}
				break;
		}
	};

	return {
		worker: worker,
		primalSolutionValueLP: () => primalSolutionValueLP(_solution),
		dualSolutionValueLP: () => dualSolutionValueLP(_solution),
		primalSolutionValueMIP: () => primalSolutionValueMIP(_solution),
		solution: () => PackageUtilities.deepCopy(_solution),
		isStarted: () => started,
		solveLP: function solveLP(problem, solveMIP = true, mipParams = {}) {
			if (!started) {
				started = true;
				setTimeout(function() {
					worker.postMessage({
						action: 'start',
						problem: problem,
						mip: solveMIP,
						mipParams: mipParams
					});
				}, 0);
			} else {
				throw new Meteor.Error('already-started');
			}
		},
		solveMPL: function solveMPL(model, data = "", solveMIP = true, mipParams = {}) {
			if (!started) {
				started = true;
				setTimeout(function() {
					worker.postMessage({
						action: 'start',
						model: model,
						data: data,
						mip: solveMIP,
						mipParams: mipParams
					});
				}, 0);
			} else {
				throw new Meteor.Error('already-started');
			}
		}
	};
});