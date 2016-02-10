# GLPK

[GLPK.js](https://github.com/hgourvest/glpk.js) wrapped for Meteor.

More information: [GLPK Documentation](http://kam.mff.cuni.cz/~elias/glpk.pdf) [GMPL Documentation](https://www3.nd.edu/~jeff/mathprog/glpk-4.47/doc/gmpl.pdf)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Usage](#usage)
  - [CPLEX LP Format](#cplex-lp-format)
  - [GMPL Format](#gmpl-format)
  - [Info](#info)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

This is available as [`convexset:glpk`](https://atmospherejs.com/convexset/glpk) on [Atmosphere](https://atmospherejs.com/). (Install with `meteor add convexset:glpk`.)

## Usage

The general process is to create a web worker, start a solution pass and wait for the result. See the included example Meteor app for a more detailed example or [play with a deployed version](https://glpk.meteor.com).

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
);
jobBundleMPL.solveMPL(mplModelSourceCode, mplDataSourceCode, isMIP);
```

### Info

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
 - `jobBundleLP.solveLP(lpProblemSourceCode, isMIP)`: starts a solve using model and data files in CPLEX LP format
 - `jobBundleMPL.solveMPL(mplModelSourceCode, mplDataSourceCode, isMIP)`: starts a solve using model and data files in MPL format
 - `jobBundle.isStarted()`: reports whether the solution process has started
 - `jobBundle.primalSolutionValueLP()`: returns the primal solution value of the LP solution
 - `jobBundle.dualSolutionValueLP()`: returns the dual solution value of the LP solution
 - `jobBundle.primalSolutionValueMIP()`: returns the primal solution value of the MIP solution
 - `jobBundle.solution()`: returns the solution in the following format...

```javascript
{
    "sol_lp": {
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
    "sol_mip": {
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
for the following model
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