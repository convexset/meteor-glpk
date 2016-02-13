(function(exports) {
	function makeLogger(webWorkerScope) {
		return function log(value) {
			webWorkerScope.postMessage(JSON.stringify({
				action: 'log',
				message: value
			}));
		};
	}

	function getColData(lp, isMIP) {
		var cols = {};
		for (var j = 1; j <= glp_get_num_cols(lp); j++) {
			var name = glp_get_col_name(lp, j);
			if (!isMIP) {
				// LP
				cols[name] = {
					idx: j,
					lb: glp_get_col_lb(lp, j),
					ub: glp_get_col_ub(lp, j),
					objCoeff: glp_get_obj_coef(lp, j),
					type: glp_get_col_type(lp, j),
					stat: glp_get_col_stat(lp, j),
					primal: glp_get_col_prim(lp, j),
					dual: glp_get_col_dual(lp, j),
					kind: 1 // "GLP_CV": {value: 1, description: "continuous variable"}
				};
			} else {
				// MIP
				cols[name] = {
					idx: j,
					lb: glp_get_col_lb(lp, j),
					ub: glp_get_col_ub(lp, j),
					objCoeff: glp_get_obj_coef(lp, j),
					type: glp_get_col_type(lp, j),
					stat: glp_get_col_stat(lp, j),
					primal: glp_mip_col_val(lp, j),
					dual: glp_get_col_dual(lp, j),
					kind: glp_get_col_kind(lp, j)
				};
			}
		}
		return cols;
	}

	function getRowData(lp, isMIP) {
		var rows = {};
		for (var i = 1; i <= glp_get_num_rows(lp); i++) {
			var name = glp_get_row_name(lp, i);
			if (!isMIP) {
				// LP
				(function() {
					var rowInd = [];
					var rowVal = [];
					glp_get_mat_row(lp, i, rowInd, rowVal);
					rows[name] = {
						type: glp_get_row_type(lp, i),
						lb: glp_get_row_lb(lp, i),
						ub: glp_get_row_ub(lp, i),
						stat: glp_get_row_stat(lp, i),
						primal: glp_get_row_prim(lp, i),
						dual: glp_get_row_dual(lp, i),
						coeffs: rowInd.map(function(index, idx) {
							return [index, rowVal[idx]];
						}).filter(x => x !== null)
					};
				})();
			} else {
				// MIP
				(function() {
					var rowInd = [];
					var rowVal = [];
					glp_get_mat_row(lp, i, rowInd, rowVal);
					rows[name] = {
						type: glp_get_row_type(lp, i),
						lb: glp_get_row_lb(lp, i),
						ub: glp_get_row_ub(lp, i),
						stat: glp_get_row_stat(lp, i),
						primal: glp_mip_row_val(lp, i),
						dual: glp_get_row_dual(lp, i),
						coeffs: rowInd.map(function(index, idx) {
							return [index, rowVal[idx]];
						})
					};
				})();
			}
		}
		return rows;
	}

	exports["glpkGetLPSolution"] = function glpkGetLPSolution(lp) {
		return {
			cols: getColData(lp, false),
			rows: getRowData(lp, false),
			optimization_direction: glp_get_obj_dir(lp),
			objective: glp_get_obj_val(lp),
			status: glp_get_status(lp),
			dual_stat: glp_get_dual_stat(lp),
			primal_stat: glp_get_prim_stat(lp)
		};
	};

	exports["glpkGetMIPSolution"] = function glpkGetMIPSolution(lp) {
		return {
			cols: getColData(lp, true),
			rows: getRowData(lp, true),
			optimization_direction: glp_get_obj_dir(lp),
			objective: glp_mip_obj_val(lp),
			status: glp_mip_status(lp),
			dual_stat: glp_get_dual_stat(lp),
			primal_stat: glp_get_prim_stat(lp),
		};
	};

	exports["glpkParseLP"] = function glpkParseLP(problem) {
		var log = makeLogger(this);
		log('[glpk.js] Reading problem in CPLEX LP format...\n');
		var lp = glp_create_prob();
		glp_read_lp_from_string(lp, null, problem);
		return {
			type: "LP",
			lp: lp,
		};
	};

	exports["glpkParseMPL"] = function glpkParseMPL(model, data) {
		var log = makeLogger(this);
		log('[glpk.js] Reading problem in GMPL format...\n');
		var lp = glp_create_prob();
		var tran = glp_mpl_alloc_wksp();

		log('[glpk.js] Reading model description...\n');
		ret = glp_mpl_read_model_from_string(tran, null, model)
		if (ret !== 0) {
			throw "error|glp_mpl_read_model_from_string|" + ret;
		}

		log('[glpk.js] Reading data...\n');
		ret = glp_mpl_read_data_from_string(tran, null, data);
		if (ret !== 0) {
			throw "error|glp_mpl_read_data_from_string|" + ret;
		}

		log('[glpk.js] Generating model...\n');
		ret = glp_mpl_generate(tran, null);
		if (ret !== 0) {
			throw "error|glp_mpl_generate|" + ret;
		}

		log('[glpk.js] Building optimization problem...\n');
		glp_mpl_build_prob(tran, lp);
		return {
			type: "MPL",
			lp: lp,
			tran: tran,
		};
	};
}(typeof exports === 'object' && exports || this));