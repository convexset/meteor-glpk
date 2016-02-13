#!/bin/bash

CURR_DIR="$(pwd)"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/packages/glpk
doctoc .

# uglifyjs sol-tools.js --compress --mangle --output sol-tools.min.js
# uglifyjs lp-solve.js --compress --mangle --output solve.min.js
# uglifyjs glpk.js --compress --mangle --output glpk.min.js

meteor publish --update
cd $CURR_DIR
