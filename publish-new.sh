#!/bin/bash

CURR_DIR="$(pwd)"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/packages/glpk
doctoc .

# uglifyjs sol-tools.js --compress --mangle --output sol-tools.min.js
# uglifyjs lp-solve.js --compress --mangle --output lp-solve.min.js
# uglifyjs mpl-solve.js --compress --mangle --output mpl-solve.min.js

meteor publish
cd $CURR_DIR