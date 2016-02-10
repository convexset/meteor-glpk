CONSTANTS = {
	// optimization direction flag:
	"GLP_MIN": {value: 1, description: "minimization"},
	"GLP_MAX": {value: 2, description: "maximization"},

	// kind of structural variable:
	"GLP_CV": {value: 1, description: "continuous variable"},
	"GLP_IV": {value: 2, description: "integer variable"},
	"GLP_BV": {value: 3, description: "binary variable"},

	// type of auxiliary/structural variable:
	"GLP_FR": {value: 1, description: "free variable"},
	"GLP_LO": {value: 2, description: "variable with lower bound"},
	"GLP_UP": {value: 3, description: "variable with upper bound"},
	"GLP_DB": {value: 4, description: "double-bounded variable"},
	"GLP_FX": {value: 5, description: "fixed variable"},

	// status of auxiliary/structural variable:
	"GLP_BS": {value: 1, description: "basic variable"},
	"GLP_NL": {value: 2, description: "non-basic variable on lower bound"},
	"GLP_NU": {value: 3, description: "non-basic variable on upper bound"},
	"GLP_NF": {value: 4, description: "non-basic free variable"},
	"GLP_NS": {value: 5, description: "non-basic fixed variable"},

	// scaling options:
	"GLP_SF_GM": {value: 0x01, description: "perform geometric mean scaling"},
	"GLP_SF_EQ": {value: 0x10, description: "perform equilibration scaling"},
	"GLP_SF_2N": {value: 0x20, description: "round scale factors to power of two"},
	"GLP_SF_SKIP": {value: 0x40, description: "skip if problem is well scaled"},
	"GLP_SF_AUTO": {value: 0x80, description: "choose scaling options automatically"},

	// solution indicator:
	"GLP_SOL": {value: 1, description: "basic solution"},
	"GLP_IPT": {value: 2, description: "interior-point solution"},
	"GLP_MIP": {value: 3, description: "mixed integer solution"},

	// solution status:
	"GLP_UNDEF": {value: 1, description: "solution is undefined"},
	"GLP_FEAS": {value: 2, description: "solution is feasible"},
	"GLP_INFEAS": {value: 3, description: "solution is infeasible"},
	"GLP_NOFEAS": {value: 4, description: "no feasible solution exists"},
	"GLP_OPT": {value: 5, description: "solution is optimal"},
	"GLP_UNBND": {value: 6, description: "solution is unbounded"},

	// basis factorization control parameters
	"GLP_BF_FT": {value: 1, description: "LUF + Forrest-Tomlin"},
	"GLP_BF_BG": {value: 2, description: "LUF + Schur compl. + Bartels-Golub"},
	"GLP_BF_GR": {value: 3, description: "LUF + Schur compl. + Givens rotation"},

	// simplex method control parameters
	"GLP_MSG_OFF": {value: 0, description: "no output"},
	"GLP_MSG_ERR": {value: 1, description: "warning and error messages only"},
	"GLP_MSG_ON": {value: 2, description: "normal output"},
	"GLP_MSG_ALL": {value: 3, description: "full output"},
	"GLP_MSG_DBG": {value: 4, description: "debug output"},

	"GLP_PRIMAL": {value: 1, description: "use primal simplex"},
	"GLP_DUALP": {value: 2, description: "use dual; if it fails, use primal"},
	"GLP_DUAL": {value: 3, description: "use dual simplex"},

	"GLP_PT_STD": {value: 0x11, description: "standard (Dantzig rule)"},
	"GLP_PT_PSE": {value: 0x22, description: "projected steepest edge"},

	"GLP_RT_STD": {value: 0x11, description: "standard (textbook)"},
	"GLP_RT_HAR": {value: 0x22, description: "two-pass Harris' ratio test"},

	// interior-point solver control parameters
	"GLP_ORD_NONE": {value: 0, description: "natural (original) ordering"},
	"GLP_ORD_QMD": {value: 1, description: "quotient minimum degree (QMD)"},
	"GLP_ORD_AMD": {value: 2, description: "approx. minimum degree (AMD)"},
	"GLP_ORD_SYMAMD": {value: 3, description: "approx. minimum degree (SYMAMD)"},

	// integer optimizer control parameters
	"GLP_BR_FFV": {value: 1, description: "first fractional variable"},
	"GLP_BR_LFV": {value: 2, description: "last fractional variable"},
	"GLP_BR_MFV": {value: 3, description: "most fractional variable"},
	"GLP_BR_DTH": {value: 4, description: "heuristic by Driebeck and Tomlin"},
	"GLP_BR_PCH": {value: 5, description: "hybrid pseudocost heuristic"},

	"GLP_BT_DFS": {value: 1, description: "depth first search"},
	"GLP_BT_BFS": {value: 2, description: "breadth first search"},
	"GLP_BT_BLB": {value: 3, description: "best local bound"},
	"GLP_BT_BPH": {value: 4, description: "best projection heuristic"},

	"GLP_PP_NONE": {value: 0, description: "disable preprocessing"},
	"GLP_PP_ROOT": {value: 1, description: "preprocessing only on root level"},
	"GLP_PP_ALL": {value: 2, description: "preprocessing on all levels"},

	// additional row attributes
	"GLP_RF_REG": {value: 0, description: "regular constraint"},
	"GLP_RF_LAZY": {value: 1, description: "\"lazy\" constraint"},
	"GLP_RF_CUT": {value: 2, description: "cutting plane constraint"},

	// row class descriptor:
	"GLP_RF_GMI": {value: 1, description: "Gomory's mixed integer cut"},
	"GLP_RF_MIR": {value: 2, description: "mixed integer rounding cut"},
	"GLP_RF_COV": {value: 3, description: "mixed cover cut"},
	"GLP_RF_CLQ": {value: 4, description: "clique cut"},

	// enable/disable flag:
	"GLP_ON": {value: 1, description: "enable something"},
	"GLP_OFF": {value: 0, description: "disable something"},

	// reason codes:
	"GLP_IROWGEN": {value: 0x01, description: "request for row generation"},
	"GLP_IBINGO": {value: 0x02, description: "better integer solution found"},
	"GLP_IHEUR": {value: 0x03, description: "request for heuristic solution"},
	"GLP_ICUTGEN": {value: 0x04, description: "request for cut generation"},
	"GLP_IBRANCH": {value: 0x05, description: "request for branching"},
	"GLP_ISELECT": {value: 0x06, description: "request for subproblem selection"},
	"GLP_IPREPRO": {value: 0x07, description: "request for preprocessing"},

	// branch selection indicator:
	"GLP_NO_BRNCH": {value: 0, description: "select no branch"},
	"GLP_DN_BRNCH": {value: 1, description: "select down-branch"},
	"GLP_UP_BRNCH": {value: 2, description: "select up-branch"},

	// return codes:
	"_GLP_SOLVE_SUCCESS": {value: 0x00, description: "successful solver execution"},
	"GLP_EBADB": {value: 0x01, description: "invalid basis"},
	"GLP_ESING": {value: 0x02, description: "singular matrix"},
	"GLP_ECOND": {value: 0x03, description: "ill-conditioned matrix"},
	"GLP_EBOUND": {value: 0x04, description: "invalid bounds"},
	"GLP_EFAIL": {value: 0x05, description: "solver failed"},
	"GLP_EOBJLL": {value: 0x06, description: "objective lower limit reached"},
	"GLP_EOBJUL": {value: 0x07, description: "objective upper limit reached"},
	"GLP_EITLIM": {value: 0x08, description: "iteration limit exceeded"},
	"GLP_ETMLIM": {value: 0x09, description: "time limit exceeded"},
	"GLP_ENOPFS": {value: 0x0A, description: "no primal feasible solution"},
	"GLP_ENODFS": {value: 0x0B, description: "no dual feasible solution"},
	"GLP_EROOT": {value: 0x0C, description: "root LP optimum not provided"},
	"GLP_ESTOP": {value: 0x0D, description: "search terminated by application"},
	"GLP_EMIPGAP": {value: 0x0E, description: "relative mip gap tolerance reached"},
	"GLP_ENOFEAS": {value: 0x0F, description: "no primal/dual feasible solution"},
	"GLP_ENOCVG": {value: 0x10, description: "no convergence"},
	"GLP_EINSTAB": {value: 0x11, description: "numerical instability"},
	"GLP_EDATA": {value: 0x12, description: "invalid data"},
	"GLP_ERANGE": {value: 0x13, description: "result out of range"},

	// condition indicator:
	"GLP_KKT_PE": {value: 1, description: "primal equalities"},
	"GLP_KKT_PB": {value: 2, description: "primal bounds"},
	"GLP_KKT_DE": {value: 3, description: "dual equalities"},
	"GLP_KKT_DB": {value: 4, description: "dual bounds"},
	"GLP_KKT_CS": {value: 5, description: "complementary slackness"},

	// MPS file format:
	"GLP_MPS_DECK": {value: 1, description: "fixed (ancient)"},
	"GLP_MPS_FILE": {value: 2, description: "free (modern)"},

	// assignment problem formulation:
	"GLP_ASN_MIN": {value: 1, description: "perfect matching (minimization)"},
	"GLP_ASN_MAX": {value: 2, description: "perfect matching (maximization)"},
	"GLP_ASN_MMP": {value: 3, description: "maximum matching"}
};

CONSTANT_CLASSES = [
	{
		description: "optimization direction flag",
		constants: [
			"GLP_MIN",
			"GLP_MAX"
		]
	},
	{
		description: "kind of structural variable",
		constants: [
			"GLP_CV",
			"GLP_IV",
			"GLP_BV"
		]
	},
	{
		description: "type of auxiliary/structural variable",
		constants: [
			"GLP_FR",
			"GLP_LO",
			"GLP_UP",
			"GLP_DB",
			"GLP_FX"
		]
	},
	{
		description: "status of auxiliary/structural variable",
		constants: [
			"GLP_BS",
			"GLP_NL",
			"GLP_NU",
			"GLP_NF",
			"GLP_NS"
		]
	},
	{
		description: "scaling options",
		constants: [
			"GLP_SF_GM",
			"GLP_SF_EQ",
			"GLP_SF_2N",
			"GLP_SF_SKIP",
			"GLP_SF_AUTO"
		]
	},
	{
		description: "solution indicator",
		constants: [
			"GLP_SOL",
			"GLP_IPT",
			"GLP_MIP"
		]
	},
	{
		description: "solution status",
		constants: [
			"GLP_UNDEF",
			"GLP_FEAS",
			"GLP_INFEAS",
			"GLP_NOFEAS",
			"GLP_OPT",
			"GLP_UNBND"
		]
	},
	{
		description: "basis factorization control parameter",
		constants: [
			"GLP_BF_FT",
			"GLP_BF_BG",
			"GLP_BF_GR"
		]
	},
	{
		description: "simplex method control parameter",
		constants: [
			"GLP_MSG_OFF",
			"GLP_MSG_ERR",
			"GLP_MSG_ON",
			"GLP_MSG_ALL",
			"GLP_MSG_DBG",
			"GLP_PRIMAL",
			"GLP_DUALP",
			"GLP_DUAL",
			"GLP_PT_STD",
			"GLP_PT_PSE",
			"GLP_RT_STD",
			"GLP_RT_HAR"
		]
	},
	{
		description: "interior-point solver control parameter",
		constants: [
			"GLP_ORD_NONE",
			"GLP_ORD_QMD",
			"GLP_ORD_AMD",
			"GLP_ORD_SYMAMD"
		]
	},
	{
		description: "integer optimizer control parameter",
		constants: [
			"GLP_BR_FFV",
			"GLP_BR_LFV",
			"GLP_BR_MFV",
			"GLP_BR_DTH",
			"GLP_BR_PCH",
			"GLP_BT_DFS",
			"GLP_BT_BFS",
			"GLP_BT_BLB",
			"GLP_BT_BPH",
			"GLP_PP_NONE",
			"GLP_PP_ROOT",
			"GLP_PP_ALL"
		]
	},
	{
		description: "additional row attribute",
		constants: [
			"GLP_RF_REG",
			"GLP_RF_LAZY",
			"GLP_RF_CUT"
		]
	},
	{
		description: "row class descriptor",
		constants: [
			"GLP_RF_GMI",
			"GLP_RF_MIR",
			"GLP_RF_COV",
			"GLP_RF_CLQ"
		]
	},
	{
		description: "enable/disable flag",
		constants: [
			"GLP_ON",
			"GLP_OFF"
		]
	},
	{
		description: "reason codes",
		constants: [
			"GLP_IROWGEN",
			"GLP_IBINGO",
			"GLP_IHEUR",
			"GLP_ICUTGEN",
			"GLP_IBRANCH",
			"GLP_ISELECT",
			"GLP_IPREPRO"
		]
	},
	{
		description: "branch selection indicator",
		constants: [
			"GLP_NO_BRNCH",
			"GLP_DN_BRNCH",
			"GLP_UP_BRNCH"
		]
	},
	{
		description: "return codes",
		constants: [
			"_GLP_SOLVE_SUCCESS",
			"GLP_EBADB",
			"GLP_ESING",
			"GLP_ECOND",
			"GLP_EBOUND",
			"GLP_EFAIL",
			"GLP_EOBJLL",
			"GLP_EOBJUL",
			"GLP_EITLIM",
			"GLP_ETMLIM",
			"GLP_ENOPFS",
			"GLP_ENODFS",
			"GLP_EROOT",
			"GLP_ESTOP",
			"GLP_EMIPGAP",
			"GLP_ENOFEAS",
			"GLP_ENOCVG",
			"GLP_EINSTAB",
			"GLP_EDATA",
			"GLP_ERANGE"
		]
	},
	{
		description: "condition indicator",
		constants: [
			"GLP_KKT_PE",
			"GLP_KKT_PB",
			"GLP_KKT_DE",
			"GLP_KKT_DB",
			"GLP_KKT_CS"
		]
	},
	{
		description: "MPS file format",
		constants: [
			"GLP_MPS_DECK",
			"GLP_MPS_FILE"
		]
	},
	{
		description: "assignment problem formulation",
		constants: [
			"GLP_ASN_MIN",
			"GLP_ASN_MAX",
			"GLP_ASN_MMP"
		]
	},
];
CONSTANT_CLASSES_DICT = _.object(CONSTANT_CLASSES.map(x => [
	x.description, 
	_.object(x.constants.map(name => [name, CONSTANTS[name]]))
]));

LPX_CONSTANTS = {
	// problem class:
	"LPX_LP": {value: 100, description: "linear programming (LP)"},
	"LPX_MIP": {value: 101, description: "mixed integer programming (MIP)"},

	// type of auxiliary/structural variable:
	"LPX_FR": {value: 110, description: "free variable"},
	"LPX_LO": {value: 111, description: "variable with lower bound"},
	"LPX_UP": {value: 112, description: "variable with upper bound"},
	"LPX_DB": {value: 113, description: "double-bounded variable"},
	"LPX_FX": {value: 114, description: "fixed variable"},

	// optimization direction flag:
	"LPX_MIN": {value: 120, description: "minimization"},
	"LPX_MAX": {value: 121, description: "maximization"},

	// status of primal basic solution:
	"LPX_P_UNDEF": {value: 132, description: "primal solution is undefined"},
	"LPX_P_FEAS": {value: 133, description: "solution is primal feasible"},
	"LPX_P_INFEAS": {value: 134, description: "solution is primal infeasible"},
	"LPX_P_NOFEAS": {value: 135, description: "no primal feasible solution exists"},

	// status of dual basic solution:
	"LPX_D_UNDEF": {value: 136, description: "dual solution is undefined"},
	"LPX_D_FEAS": {value: 137, description: "solution is dual feasible"},
	"LPX_D_INFEAS": {value: 138, description: "solution is dual infeasible"},
	"LPX_D_NOFEAS": {value: 139, description: "no dual feasible solution exists"},

	// status of auxiliary/structural variable:
	"LPX_BS": {value: 140, description: "basic variable"},
	"LPX_NL": {value: 141, description: "non-basic variable on lower bound"},
	"LPX_NU": {value: 142, description: "non-basic variable on upper bound"},
	"LPX_NF": {value: 143, description: "non-basic free variable"},
	"LPX_NS": {value: 144, description: "non-basic fixed variable"},

	// status of interior-point solution:
	"LPX_T_UNDEF": {value: 150, description: "interior solution is undefined"},
	"LPX_T_OPT": {value: 151, description: "interior solution is optimal"},

	// kind of structural variable:
	"LPX_CV": {value: 160, description: "continuous variable"},
	"LPX_IV": {value: 161, description: "integer variable"},

	// status of integer solution:
	"LPX_I_UNDEF": {value: 170, description: "integer solution is undefined"},
	"LPX_I_OPT": {value: 171, description: "integer solution is optimal"},
	"LPX_I_FEAS": {value: 172, description: "integer solution is feasible"},
	"LPX_I_NOFEAS": {value: 173, description: "no integer solution exists"},

	// status codes reported by the routine lpx_get_status:
	"LPX_OPT": {value: 180, description: "optimal"},
	"LPX_FEAS": {value: 181, description: "feasible"},
	"LPX_INFEAS": {value: 182, description: "infeasible"},
	"LPX_NOFEAS": {value: 183, description: "no feasible"},
	"LPX_UNBND": {value: 184, description: "unbounded"},
	"LPX_UNDEF": {value: 185, description: "undefined"},

	// exit codes returned by solver routines:
	"LPX_E_OK": {value: 200, description: "success"},
	"LPX_E_EMPTY": {value: 201, description: "empty problem"},
	"LPX_E_BADB": {value: 202, description: "invalid initial basis"},
	"LPX_E_INFEAS": {value: 203, description: "infeasible initial solution"},
	"LPX_E_FAULT": {value: 204, description: "unable to start the search"},
	"LPX_E_OBJLL": {value: 205, description: "objective lower limit reached"},
	"LPX_E_OBJUL": {value: 206, description: "objective upper limit reached"},
	"LPX_E_ITLIM": {value: 207, description: "iterations limit exhausted"},
	"LPX_E_TMLIM": {value: 208, description: "time limit exhausted"},
	"LPX_E_NOFEAS": {value: 209, description: "no feasible solution"},
	"LPX_E_INSTAB": {value: 210, description: "numerical instability"},
	"LPX_E_SING": {value: 211, description: "problems with basis matrix"},
	"LPX_E_NOCONV": {value: 212, description: "no convergence (interior)"},
	"LPX_E_NOPFS": {value: 213, description: "no primal feas. sol. (LP presolver)"},
	"LPX_E_NODFS": {value: 214, description: "no dual feas. sol. (LP presolver)"},
	"LPX_E_MIPGAP": {value: 215, description: "relative mip gap tolerance reached"},

	// control parameter identifiers:
	"LPX_K_MSGLEV": {value: 300, description: "lp.msg_lev"},
	"LPX_K_SCALE": {value: 301, description: "lp.scale"},
	"LPX_K_DUAL": {value: 302, description: "lp.dual"},
	"LPX_K_PRICE": {value: 303, description: "lp.price"},
	"LPX_K_RELAX": {value: 304, description: "lp.relax"},
	"LPX_K_TOLBND": {value: 305, description: "lp.tol_bnd"},
	"LPX_K_TOLDJ": {value: 306, description: "lp.tol_dj"},
	"LPX_K_TOLPIV": {value: 307, description: "lp.tol_piv"},
	"LPX_K_ROUND": {value: 308, description: "lp.round"},
	"LPX_K_OBJLL": {value: 309, description: "lp.obj_ll"},
	"LPX_K_OBJUL": {value: 310, description: "lp.obj_ul"},
	"LPX_K_ITLIM": {value: 311, description: "lp.it_lim"},
	"LPX_K_ITCNT": {value: 312, description: "lp.it_cnt"},
	"LPX_K_TMLIM": {value: 313, description: "lp.tm_lim"},
	"LPX_K_OUTFRQ": {value: 314, description: "lp.out_frq"},
	"LPX_K_OUTDLY": {value: 315, description: "lp.out_dly"},
	"LPX_K_BRANCH": {value: 316, description: "lp.branch"},
	"LPX_K_BTRACK": {value: 317, description: "lp.btrack"},
	"LPX_K_TOLINT": {value: 318, description: "lp.tol_int"},
	"LPX_K_TOLOBJ": {value: 319, description: "lp.tol_obj"},
	"LPX_K_MPSINFO": {value: 320, description: "lp.mps_info"},
	"LPX_K_MPSOBJ": {value: 321, description: "lp.mps_obj"},
	"LPX_K_MPSORIG": {value: 322, description: "lp.mps_orig"},
	"LPX_K_MPSWIDE": {value: 323, description: "lp.mps_wide"},
	"LPX_K_MPSFREE": {value: 324, description: "lp.mps_free"},
	"LPX_K_MPSSKIP": {value: 325, description: "lp.mps_skip"},
	"LPX_K_LPTORIG": {value: 326, description: "lp.lpt_orig"},
	"LPX_K_PRESOL": {value: 327, description: "lp.presol"},
	"LPX_K_BINARIZE": {value: 328, description: "lp.binarize"},
	"LPX_K_USECUTS": {value: 329, description: "lp.use_cuts"},
	"LPX_K_BFTYPE": {value: 330, description: "lp.bfcp.type"},
	"LPX_K_MIPGAP": {value: 331, description: "lp.mip_gap"},

	"LPX_C_COVER": {value: 0x01, description: "mixed cover cuts"},
	"LPX_C_CLIQUE": {value: 0x02, description: "clique cuts"},
	"LPX_C_GOMORY": {value: 0x04, description: "Gomory's mixed integer cuts"},
	"LPX_C_MIR": {value: 0x08, description: "mixed integer rounding cuts"},
	"LPX_C_ALL": {value: 0xFF, description: "all cuts"}
};