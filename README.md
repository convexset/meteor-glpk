# GLPK

[GLPK.js](https://github.com/hgourvest/glpk.js) wrapped for Meteor. Problems may be provided in CPLEX LP format or GMPL format.

For more information, see the [GLPK Documentation](http://kam.mff.cuni.cz/~elias/glpk.pdf) or the [GMPL Documentation](https://www3.nd.edu/~jeff/mathprog/glpk-4.47/doc/gmpl.pdf). To learn a little about the theory, have a look at [this](http://lipas.uwasa.fi/~tsottine/lecture_notes/or.pdf).

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Usage](#usage)
  - [CPLEX LP Format](#cplex-lp-format)
  - [GMPL Format](#gmpl-format)
  - [More Information](#more-information)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

This is available as [`convexset:glpk`](https://atmospherejs.com/convexset/glpk) on [Atmosphere](https://atmospherejs.com/). (Install with `meteor add convexset:glpk`.)

If you get an error message like:
```
WARNING: npm peer requirements not installed:
 - package-utils@^0.2.1 not installed.
          
Read more about installing npm peer dependencies:
  http://guide.meteor.com/using-packages.html#peer-npm-dependencies
```
It is because, by design, the package does not include instances of these from `npm` to avoid repetition. (In this case, `meteor npm install --save package-utils`.)

See [this](http://guide.meteor.com/using-packages.html#peer-npm-dependencies) or [this](https://atmospherejs.com/tmeasday/check-npm-versions) for more information.

Now, if you see a message like
```
WARNING: npm peer requirements not installed:
underscore@1.5.2 installed, underscore@^1.8.3 needed
```
it is because you or something you are using is using Meteor's cruddy old `underscore` package. Install a new version from `npm`. (And, of course, you may use the `npm` version in a given scope via `require("underscore")`.)

## Usage

The general process is to create a web worker, start a solution pass and wait for the result. See the included example Meteor app for a more detailed example or [play with a deployed version](https://glpk-demo.meteorapp.space).

`GLPK.createWorker(loggingCB, postsolveLoggingCB, completionCB, errorCB, intOptCB)`
 - `loggingCB`: logs messages such as
   ```
   Reading model section from null ...
   57 lines were read
   
   Reading data section from null ...
   21 lines were read
   
   Generating phi...
   Generating psi...
   Generating obj...
   Model has been successfully generated
   
   Scaling...
    A: min|aij| = 1  max|aij| = 54  ratio = 54
   GM: min|aij| = 0.5024965815329516  max|aij| = 1.9900632894841375  ratio =    3.9603518961524267
   EQ: min|aij| = 0.2660380370764144  max|aij| = 1.0000000000000002  ratio =    3.7588609921699625
   
   GLPK Simplex Optimizer, v4.49
   17 rows, 64 columns, 192 non-zeros
   Preprocessing...
   16 rows, 64 columns, 128 non-zeros
   Scaling...
    A: min|aij| = 1  max|aij| = 1  ratio = 1
   Problem data seem to be well scaled
   Constructing initial basis...
   Size of triangular part = 16
    0: obj = 224  infeas = 7 (0)
   *13: obj = 175  infeas = 0 (0)
   *26: obj = 76  infeas = 0 (0)
   OPTIMAL SOLUTION FOUND
   
   
   GLPK Integer Optimizer, v4.49
   17 rows, 64 columns, 192 non-zeros
   0 integer variables, none of which are binary
   Preprocessing...
   16 rows, 64 columns, 128 non-zeros
   0 integer variables, none of which are binary
   Scaling...
    A: min|aij| = 1  max|aij| = 1  ratio = 1
   Problem data seem to be well scaled
   Constructing initial basis...
   Size of triangular part = 16
   Solving LP relaxation...
   GLPK Simplex Optimizer, v4.49
   16 rows, 64 columns, 128 non-zeros
    26: obj = 224  infeas = 7 (0)
   *45: obj = 175  infeas = 0 (0)
   *72: obj = 76  infeas = 0 (0)
   OPTIMAL SOLUTION FOUND
   Integer optimization begins...
   +72: mip = not found yet >= -inf  (1; 0)
   +72: >>>>> 76 >= 76   0.0% (1; 0)
   +72: mip = 76 >= tree is empty   0.0% (0; 1)
   INTEGER OPTIMAL SOLUTION FOUND
   
   Agent  Task       Cost
       1     1         13
       2     8          8
       3     7         13
       4     5         12
       5     2          6
       6     6         16
       7     4          3
       8     3          5
   ----------------------
        Total:         76
   
   Model has been successfully processed
   ```
 - `postsolveLoggingCB`: reports messages arising from the postsolve step (if applicable), for example...
   ```
   Agent  Task       Cost
       1     1         13
       2     8          8
       3     7         13
       4     5         12
       5     2          6
       6     6         16
       7     4          3
       8     3          5
   ----------------------
        Total:         76
   
   Model has been successfully processed
   ```
 - `completionCB`: called when the solve is complete. See [Info](#info) for an example of the payload, which is identical to what is returned by the `jobBundle.solution()` call
 - `errorCB`: called on error, called with the error message as argument
 - `intOptCB`: called on each integer optimization action, here is an example payload...
   ```javascript
   {
       "reason": 2,
       "reasonDescription": "better integer solution found",
       "gap": 0.007662835249042145,
       "mipObjective": 261,
       "numCallbacks": 877,
       "iterationCount": 542,
       "treeInfo": {
           "numActiveNodes": 131,
           "numNodes": 272,
           "totalNodesIncludingRemoved": 283
       }
   }
   ```

   where the reason codes can be read via `GLPK.getCodeDescription("reason codes", val).description`, though that is not necessary at this stage. For a listing, here is an excerpt from the description of constants:

   ```javascript
   "GLP_IROWGEN": {value: 0x01, description: "request for row generation"},
   "GLP_IBINGO": {value: 0x02, description: "better integer solution found"},
   "GLP_IHEUR": {value: 0x03, description: "request for heuristic solution"},
   "GLP_ICUTGEN": {value: 0x04, description: "request for cut generation"},
   "GLP_IBRANCH": {value: 0x05, description: "request for branching"},
   "GLP_ISELECT": {value: 0x06, description: "request for subproblem selection"},
   "GLP_IPREPRO": {value: 0x07, description: "request for preprocessing"},
   ```

### CPLEX LP Format

```javascript
var isMIP = true;
var jobBundleLP = GLPK.createWorker(
    // process regular logging messages
    msg => console.log('[glpk.js|log]', msg),
    // process post processing output
    null,  // not necessary here
    // completion callback
    function(info) {
        console.info('All done.', info);
    },
    // completion callback
    function(info) {
        console.info('Error.', info);
    },
    // integer optimization callback
    function(info) {
        if (info.reason === GLPK.CONSTANTS.GLP_IBINGO) {
            // filter for messages of interest
            console.info('Int Opt Callback.', info);
        }
    },
);
jobBundleLP.solveLP(lpProblemSourceCode, isMIP);
```

### GMPL Format

```javascript
var isMIP = true;
var jobBundleMPL = GLPK.createWorker(
    // process regular logging messages
    msg => console.log('[glpk.js|log]', msg),
    // process post processing output
    msg => console.log('[glpk.js|postsolve]', msg),
    // completion callback
    function(info) {
        console.info('All done.', info);
    },
    // completion callback
    function(info) {
        console.info('Error.', info);
    },
    // integer optimization callback
    function(info) {
        if (info.reason === GLPK.CONSTANTS.GLP_IBINGO) {
            // filter for messages of interest
            console.info('Int Opt Callback.', info);
        }
    },
);
jobBundleMPL.solveMPL(mplModelSourceCode, mplDataSourceCode, isMIP);
```

### More Information

Descriptions of constants can be obtained from their codes via `GLPK.getCodeDescription(category, code)`. Available categories:
 - `"optimization direction flag"`
 - `"MPS file format"`
 - `"additional row attribute"`
 - `"kind of structural variable"`
 - `"integer optimizer control parameter"`
 - `"solution indicator"`
 - `"assignment problem formulation"`
 - `"status of auxiliary/structural variable"`
 - `"type of auxiliary/structural variable"`
 - `"solution status"`
 - `"simplex method control parameter"`
 - `"branch selection indicator"`
 - `"interior-point solver control parameter"`
 - `"enable/disable flag"`
 - `"row class descriptor"`
 - `"reason codes"`
 - `"condition indicator"`
 - `"scaling options"`
 - `"return codes"`
 - `"basis factorization control parameter"`

After creating a worker with `GLPK.createWorker`, the object returned implements the following:
 - `jobBundleLP.solveLP(lpProblemSourceCode, isMIP, mipParams)`: starts a solve using model and data files in CPLEX LP format
   * `isMIP`: whether to also solve as MIP once LP relaxation solved (default: `true`)
   * `mipParams`: provides updates to default values of integer optimization control parameters (defaults: `{}`)
 - `jobBundleMPL.solveMPL(mplModelSourceCode, mplDataSourceCode, isMIP, mipParams)`: starts a solve using model and data files in MPL format
   * `isMIP`: whether to also solve as MIP once LP relaxation solved (default: `true`)
   * `mipParams`: provides updates to default values of integer optimization control parameters (defaults: `{}`)
 - `jobBundle.isStarted()`: reports whether the solution process has started
 - `jobBundle.primalSolutionValueLP()`: returns the primal solution value of the LP solution
 - `jobBundle.dualSolutionValueLP()`: returns the dual solution value of the LP solution
 - `jobBundle.primalSolutionValueMIP()`: returns the primal solution value of the MIP solution
 - `jobBundle.solution()`: returns the solution in the following format...

```javascript
{
    "lp": {
        "cols": {
            "x": {
                "idx": 1,
                "lb": -1,
                "ub": 1,
                "objCoeff": 1,
                "type": 4,     // Get description via: GLPK.getCodeDescription("type of auxiliary/structural variable", val).description
                "stat": 1,     // Get description via: GLPK.getCodeDescription("status of auxiliary/structural variable", val).description
                "primal": 0.5,
                "dual": 0,
                "kind": 1      // Get description via: GLPK.getCodeDescription("kind of structural variable", val).description
            },
            "y": {
                "idx": 2,
                "lb": -1,
                "ub": 1,
                "objCoeff": 1,
                "type": 4,
                "stat": 1,
                "primal": 0.5,
                "dual": 0,
                "kind": 1
            },
            "a": {
                "idx": 3,
                "lb": -1.7976931348623157e+308,
                "ub": 1.7976931348623157e+308,
                "objCoeff": 2,
                "type": 1,
                "stat": 1,
                "primal": 1.5,
                "dual": 0,
                "kind": 1
            }
        },
        "rows": {
            "blah_x": {
                "type": 3,  // Get description via: GLPK.getCodeDescription("type of auxiliary/structural variable", val).description
                "lb": -1.7976931348623157e+308,
                "ub": 3,
                "stat": 3,  // Get description via: GLPK.getCodeDescription("status of auxiliary/structural variable", val).description
                "primal": 3,
                "dual": 0.3333333333333333,
                "coeffs": [  // column index (they start from 1)
                    [1, 1],  // and coefficient
                    [2, 2],
                    [3, 1]
                ]
            },
            "blah_y": {
                "type": 3,
                "lb": -1.7976931348623157e+308,
                "ub": 3,
                "stat": 3,
                "primal": 3,
                "dual": 0.33333333333333337,
                "coeffs": [
                    [1, 2],
                    [2, 1],
                    [3, 1]
                ]
            },
            "bounds_a_lb": {
                "type": 2,
                "lb": -1.5,
                "ub": 1.7976931348623157e+308,
                "stat": 1,
                "primal": 1.5,
                "dual": 0,
                "coeffs": [
                    [3, 1]
                ]
            },
            "bounds_a_ub": {
                "type": 3,
                "lb": -1.7976931348623157e+308,
                "ub": 1.5,
                "stat": 3,
                "primal": 1.5,
                "dual": 1.3333333333333335,
                "coeffs": [
                    [3, 1]
                ]
            }
        },
        "optimization_direction": 2,  // Get description via: GLPK.getCodeDescription("optimization direction flag", val).description
        "objective": 4,
        "status": 5,       // Get description via: GLPK.getCodeDescription("solution status", val).description
        "dual_stat": 2,    // Get description via: GLPK.getCodeDescription("solution status", val).description
        "primal_stat": 2,  // Get description via: GLPK.getCodeDescription("solution status", val).description
        "return_code": 0   // Get description via: GLPK.getCodeDescription("return codes", val).description
    },
    "mip": {
        "cols": {
            "x": {
                "idx": 1,
                "lb": -1,
                "ub": 1,
                "objCoeff": 1,
                "type": 4,
                "stat": 1,
                "primal": 0.6666666666666666,
                "dual": 0,
                "kind": 1
            },
            "y": {
                "idx": 2,
                "lb": -1,
                "ub": 1,
                "objCoeff": 1,
                "type": 4,
                "stat": 1,
                "primal": 0.6666666666666667,
                "dual": 0,
                "kind": 1
            },
            "a": {
                "idx": 3,
                "lb": -1.7976931348623157e+308,
                "ub": 1.7976931348623157e+308,
                "objCoeff": 2,
                "type": 1,
                "stat": 1,
                "primal": 1,
                "dual": 0,
                "kind": 2
            }
        },
        "rows": {
            "blah_x": {
                "type": 3,
                "lb": -1.7976931348623157e+308,
                "ub": 3,
                "stat": 3,
                "primal": 3,
                "dual": 0.3333333333333333,
                "coeffs": [
                    [1, 1],
                    [2, 2],
                    [3, 1]
                ]
            },
            "blah_y": {
                "type": 3,
                "lb": -1.7976931348623157e+308,
                "ub": 3,
                "stat": 3,
                "primal": 3,
                "dual": 0.33333333333333337,
                "coeffs": [
                    [1, 2],
                    [2, 1],
                    [3, 1]
                ]
            },
            "bounds_a_lb": {
                "type": 2,
                "lb": -1.5,
                "ub": 1.7976931348623157e+308,
                "stat": 1,
                "primal": 1,
                "dual": 0,
                "coeffs": [
                    [3, 1]
                ]
            },
            "bounds_a_ub": {
                "type": 3,
                "lb": -1.7976931348623157e+308,
                "ub": 1.5,
                "stat": 3,
                "primal": 1,
                "dual": 1.3333333333333335,
                "coeffs": [
                    [3, 1]
                ]
            }
        },
        "optimization_direction": 2,
        "objective": 3.3333333333333335,
        "status": 5,
        "dual_stat": 2,
        "primal_stat": 2,
        "return_code": 0
    }
}
```
for the following model in CPLEX LP format
```
\* Objective function *\
Maximize
obj: x + y + 2 a

Subject To
blah_x: x + 2 y + a <= 3
blah_y: 2 x + y + a <= 3
bounds_a_lb: a >= -1.5
bounds_a_ub: a <= 1.5

Bounds
-1 <= x <= 1
-1 <= y <= 1
a free

Integer
a
```