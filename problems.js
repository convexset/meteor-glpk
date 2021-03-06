function trimExcess(textLines, tabwidth = 4) {
    function numLeadingSpaces(s) {
        if (s.trim() === "") {
            return Infinity;
        }
        return s.length - s.trimLeft().length;
    }

    function lessLeadingCharacters(s, n) {
        return s.substr(n);
    }

    var tabInSpaces = _.range(tabwidth).map(() => " ").join("");

    if (typeof textLines === "string") {
        textLines = textLines.split('\n');
    }

    var textBlocks = (textLines || []).map(x => x.trimRight());
    while (textBlocks[0] === "") {
        textBlocks.shift();
    }
    while (textBlocks[textBlocks.length - 1] === "") {
        textBlocks.pop();
    }
    textBlocks.forEach(function(v, idx) {
        while (textBlocks[idx].indexOf('\t') !== -1) {
            textBlocks[idx] = textBlocks[idx].replace('\t', tabInSpaces);
        }
    });
    var minLeadingSpaces = Math.min.apply({}, textBlocks.map(numLeadingSpaces));

    return textBlocks.map(s => lessLeadingCharacters(s, minLeadingSpaces)).join('\n');
}


lpSampleProblems = [
    `
        \\* Objective function *\\
        Maximize
        obj: x + y

        Subject To
        blah_x: x + 2 y <= 2
        blah_y: 2 x + y <= 2

        Bounds
        -1 <= x <= 1
        -1 <= y <= 1

        End
    `,
    `
        \\* Objective function *\\
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

        End
    `,
    `
        \\* Objective function *\\
        Minimize
        obj: +17 x1_1 +23 x2_1 +16 x3_1 +19 x4_1 +18 x5_1 +21 x1_2 +16 x2_2 +20 x3_2 +19 x4_2 +19 x5_2 +22 x1_3 +21 x2_3 +16 x3_3 +22 x4_3 +15 x5_3 +18 x1_4 +16 x2_4 +25 x3_4 +22 x4_4 +15 x5_4 +24 x1_5 +17 x2_5
        +24 x3_5 +20 x4_5 +21 x5_5 +15 x1_6 +16 x2_6 +16 x3_6 +16 x4_6 +25 x5_6 +20 x1_7 +19 x2_7 +17 x3_7 +19 x4_7 +16 x5_7 +18 x1_8 +25 x2_8 +19 x3_8 +17 x4_8 +16 x5_8 +19 x1_9 +18 x2_9 +19 x3_9 +21 x4_9 +23 x5_9
        +18 x1_10 +21 x2_10 +18 x3_10 +19 x4_10 +15 x5_10 +16 x1_11 +17 x2_11 +20 x3_11 +25 x4_11 +22 x5_11 +22 x1_12 +15 x2_12 +16 x3_12 +23 x4_12 +17 x5_12 +24 x1_13 +25 x2_13 +17 x3_13 +25 x4_13 +19 x5_13 +24 x1_14
        +17 x2_14 +21 x3_14 +25 x4_14 +22 x5_14 +16 x1_15 +24 x2_15 +24 x3_15 +25 x4_15 +24 x5_15

        \\* Constraints *\\
        Subject To
        one_1: +x1_1 +x2_1 +x3_1 +x4_1 +x5_1 = 1
        one_2: +x1_2 +x2_2 +x3_2 +x4_2 +x5_2 = 1
        one_3: +x1_3 +x2_3 +x3_3 +x4_3 +x5_3 = 1
        one_4: +x1_4 +x2_4 +x3_4 +x4_4 +x5_4 = 1
        one_5: +x1_5 +x2_5 +x3_5 +x4_5 +x5_5 = 1
        one_6: +x1_6 +x2_6 +x3_6 +x4_6 +x5_6 = 1
        one_7: +x1_7 +x2_7 +x3_7 +x4_7 +x5_7 = 1
        one_8: +x1_8 +x2_8 +x3_8 +x4_8 +x5_8 = 1
        one_9: +x1_9 +x2_9 +x3_9 +x4_9 +x5_9 = 1
        one_10: +x1_10 +x2_10 +x3_10 +x4_10 +x5_10 = 1
        one_11: +x1_11 +x2_11 +x3_11 +x4_11 +x5_11 = 1
        one_12: +x1_12 +x2_12 +x3_12 +x4_12 +x5_12 = 1
        one_13: +x1_13 +x2_13 +x3_13 +x4_13 +x5_13 = 1
        one_14: +x1_14 +x2_14 +x3_14 +x4_14 +x5_14 = 1
        one_15: +x1_15 +x2_15 +x3_15 +x4_15 +x5_15 = 1
        lim_1: +8 x1_1 +15 x1_2 +14 x1_3 +23 x1_4 +8 x1_5 +16 x1_6 +8 x1_7 +25 x1_8 +9 x1_9 +17 x1_10 +25 x1_11 +15 x1_12 +10 x1_13 +8 x1_14 +24 x1_15 <= 36
        lim_2: +15 x2_1 +7 x2_2 +23 x2_3 +22 x2_4 +11 x2_5 +11 x2_6 +12 x2_7 +10 x2_8 +17 x2_9 +16 x2_10 +7 x2_11 +16 x2_12 +10 x2_13 +18 x2_14 +22 x2_15 <= 34
        lim_3: +21 x3_1 +20 x3_2 +6 x3_3 +22 x3_4 +24 x3_5 +10 x3_6 +24 x3_7 +9 x3_8 +21 x3_9 +14 x3_10 +11 x3_11 +14 x3_12 +11 x3_13 +19 x3_14 +16 x3_15 <= 38
        lim_4: +20 x4_1 +11 x4_2 +8 x4_3 +14 x4_4 +9 x4_5 +5 x4_6 +6 x4_7 +19 x4_8 +19 x4_9 +7 x4_10 +6 x4_11 +6 x4_12 +13 x4_13 +9 x4_14 +18 x4_15 <= 27
        lim_5: +8 x5_1 +13 x5_2 +13 x5_3 +13 x5_4 +10 x5_5 +20 x5_6 +25 x5_7 +16 x5_8 +16 x5_9 +17 x5_10 +10 x5_11 +10 x5_12 +5 x5_13 +12 x5_14 +23 x5_15 <= 33

        \\* Variable bounds *\\
        Bounds
        x1_1 <= 1
        x2_1 <= 1
        x3_1 <= 1
        x4_1 <= 1
        x5_1 <= 1
        x1_2 <= 1
        x2_2 <= 1
        x3_2 <= 1
        x4_2 <= 1
        x5_2 <= 1
        x1_3 <= 1
        x2_3 <= 1
        x3_3 <= 1
        x4_3 <= 1
        x5_3 <= 1
        x1_4 <= 1
        x2_4 <= 1
        x3_4 <= 1
        x4_4 <= 1
        x5_4 <= 1
        x1_5 <= 1
        x2_5 <= 1
        x3_5 <= 1
        x4_5 <= 1
        x5_5 <= 1
        x1_6 <= 1
        x2_6 <= 1
        x3_6 <= 1
        x4_6 <= 1
        x5_6 <= 1
        x1_7 <= 1
        x2_7 <= 1
        x3_7 <= 1
        x4_7 <= 1
        x5_7 <= 1
        x1_8 <= 1
        x2_8 <= 1
        x3_8 <= 1
        x4_8 <= 1
        x5_8 <= 1
        x1_9 <= 1
        x2_9 <= 1
        x3_9 <= 1
        x4_9 <= 1
        x5_9 <= 1
        x1_10 <= 1
        x2_10 <= 1
        x3_10 <= 1
        x4_10 <= 1
        x5_10 <= 1
        x1_11 <= 1
        x2_11 <= 1
        x3_11 <= 1
        x4_11 <= 1
        x5_11 <= 1
        x1_12 <= 1
        x2_12 <= 1
        x3_12 <= 1
        x4_12 <= 1
        x5_12 <= 1
        x1_13 <= 1
        x2_13 <= 1
        x3_13 <= 1
        x4_13 <= 1
        x5_13 <= 1
        x1_14 <= 1
        x2_14 <= 1
        x3_14 <= 1
        x4_14 <= 1
        x5_14 <= 1
        x1_15 <= 1
        x2_15 <= 1
        x3_15 <= 1
        x4_15 <= 1
        x5_15 <= 1

        \\* Integer definitions *\\
        General
        x1_1 x2_1 x3_1 x4_1 x5_1 x1_2 x2_2 x3_2 x4_2 x5_2 x1_3 x2_3 x3_3 x4_3 x5_3 x1_4 x2_4 x3_4 x4_4 x5_4 x1_5 x2_5 x3_5 x4_5 x5_5 x1_6 x2_6 x3_6 x4_6 x5_6 x1_7 x2_7 x3_7 x4_7 x5_7 x1_8
        x2_8 x3_8 x4_8 x5_8 x1_9 x2_9 x3_9 x4_9 x5_9 x1_10 x2_10 x3_10 x4_10 x5_10 x1_11 x2_11 x3_11 x4_11 x5_11 x1_12 x2_12 x3_12 x4_12 x5_12 x1_13 x2_13 x3_13 x4_13 x5_13 x1_14 x2_14 x3_14 x4_14
        x5_14 x1_15 x2_15 x3_15 x4_15 x5_15

        End
    `,
    `
        \\* Problem: todd *\\

        Maximize
        obj: + 786433 x1 + 655361 x2 + 589825 x3 + 557057 x4
        + 540673 x5 + 532481 x6 + 528385 x7 + 526337 x8 + 525313 x9
        + 524801 x10 + 524545 x11 + 524417 x12 + 524353 x13
        + 524321 x14 + 524305 x15

        Subject To
        cap: + 786433 x1 + 655361 x2 + 589825 x3 + 557057 x4
        + 540673 x5 + 532481 x6 + 528385 x7 + 526337 x8 + 525313 x9
        + 524801 x10 + 524545 x11 + 524417 x12 + 524353 x13
        + 524321 x14 + 524305 x15 <= 4194303.5

        Bounds
        0 <= x1 <= 1
        0 <= x2 <= 1
        0 <= x3 <= 1
        0 <= x4 <= 1
        0 <= x5 <= 1
        0 <= x6 <= 1
        0 <= x7 <= 1
        0 <= x8 <= 1
        0 <= x9 <= 1
        0 <= x10 <= 1
        0 <= x11 <= 1
        0 <= x12 <= 1
        0 <= x13 <= 1
        0 <= x14 <= 1
        0 <= x15 <= 1

        Generals
        x1
        x2
        x3
        x4
        x5
        x6
        x7
        x8
        x9
        x10
        x11
        x12
        x13
        x14
        x15

        End
    `,
    `
        \* Objective function *\
        Minimize
        obj: + x_12 + x_14
             + x_21 + x_23 + 1.05 x_24
             + x_32 + x_34
             + x_41 + 1.05 x_42 + x_43

        Subject To
        balance_node_1: + x_12 + x_14 - x_21 - x_41               = 7.25
        balance_node_2: + x_21 + x_23 + x_24 - x_12 - x_32 - x_42 = 3.75
        balance_node_3: + x_32 + x_34 - x_23 - x_43               = -6.4
        balance_node_4: + x_41 + x_42 + x_43 - x_14 - x_24 - x_34 = -4.6

        Bounds
        0 <= x_12 <= 4
        0 <= x_14 <= 4
        0 <= x_21 <= 3.5
        0 <= x_23 <= 3.5
        0 <= x_24
        0 <= x_32 <= 3.5
        0 <= x_34 <= 3.5
        0 <= x_41 <= 3.5
        0 <= x_42
        0 <= x_43 <= 3.5

        Integer
        x_24
        x_42

        End
    `
].map(trimExcess);

mplSampleProblems = [
    {
        model: `
            /* SUDOKU, Number Placement Puzzle */

            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

            /* Sudoku, also known as Number Place, is a logic-based placement
               puzzle. The aim of the canonical puzzle is to enter a numerical
               digit from 1 through 9 in each cell of a 9x9 grid made up of 3x3
               subgrids (called "regions"), starting with various digits given in
               some cells (the "givens"). Each row, column, and region must contain
               only one instance of each numeral.

                Example:

                +-------+-------+-------+
                | 5 3 . | . 7 . | . . . |
                | 6 . . | 1 9 5 | . . . |
                | . 9 8 | . . . | . 6 . |
                +-------+-------+-------+
                | 8 . . | . 6 . | . . 3 |
                | 4 . . | 8 . 3 | . . 1 |
                | 7 . . | . 2 . | . . 6 |
                +-------+-------+-------+
                | . 6 . | . . . | 2 8 . |
                | . . . | 4 1 9 | . . 5 |
                | . . . | . 8 . | . 7 9 |
                +-------+-------+-------+

                (From Wikipedia, the free encyclopedia.) */

            param givens{1..9, 1..9}, integer, >= 0, <= 9, default 0;
            /* the "givens" */

            var x{i in 1..9, j in 1..9, k in 1..9}, binary;
            /* x[i,j,k] = 1 means cell [i,j] is assigned number k */

            s.t. fa{i in 1..9, j in 1..9, k in 1..9: givens[i,j] != 0}:
                x[i,j,k] = (if givens[i,j] = k then 1 else 0);
            /* assign pre-defined numbers using the "givens" */

            s.t. fb{i in 1..9, j in 1..9}: sum{k in 1..9} x[i,j,k] = 1;
            /* each cell must be assigned exactly one number */

            s.t. fc{i in 1..9, k in 1..9}: sum{j in 1..9} x[i,j,k] = 1;
            /* cells in the same row must be assigned distinct numbers */

            s.t. fd{j in 1..9, k in 1..9}: sum{i in 1..9} x[i,j,k] = 1;
            /* cells in the same column must be assigned distinct numbers */

            s.t. fe{I in 1..9 by 3, J in 1..9 by 3, k in 1..9}:
                sum{i in I..I+2, j in J..J+2} x[i,j,k] = 1;
            /* cells in the same region must be assigned distinct numbers */

            /* there is no need for an objective function here */

            solve;

            for {i in 1..9}
            {  for {0..0: i = 1 or i = 4 or i = 7}
                printf " +-------+-------+-------+\\n";
                for {j in 1..9}
                {  for {0..0: j = 1 or j = 4 or j = 7} printf(" |");
                printf " %d", sum{k in 1..9} x[i,j,k] * k;
                for {0..0: j = 9} printf(" |\\n");
                }
                for {0..0: i = 9}
                printf " +-------+-------+-------+\\n";
            }

            end;
        `,
        data: `
            /* sudoku.dat, a hard Sudoku puzzle which causes branching */

            data;

            param givens : 1 2 3 4 5 6 7 8 9 :=
                       1   1 . . . . . 7 . .
                       2   . 2 . . . . 5 . .
                       3   6 . . 3 8 . . . .
                       4   . 7 8 . . . . . .
                       5   . . . 6 . 9 . . .
                       6   . . . . . . 1 4 .
                       7   . . . . 2 5 . . 9
                       8   . . 3 . . . . 6 .
                       9   . . 4 . . . . . 2 ;

            end;
        `
    },
    {
        model: `
            /* COLOR, Graph Coloring Problem */

            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

            /* Given an undirected loopless graph G = (V, E), where V is a set of
               nodes, E <= V x V is a set of arcs, the Graph Coloring Problem is to
               find a mapping (coloring) F: V -> C, where C = {1, 2, ... } is a set
               of colors whose cardinality is as small as possible, such that
               F(i) != F(j) for every arc (i,j) in E, that is adjacent nodes must
               be assigned different colors. */

            param n, integer, >= 2;
            /* number of nodes */

            set V := {1..n};
            /* set of nodes */

            set E, within V cross V;
            /* set of arcs */

            check{(i,j) in E}: i != j;
            /* there must be no loops */

            /* We need to estimate an upper bound of the number of colors |C|.
               The number of nodes |V| can be used, however, for sparse graphs such
               bound is not very good. To obtain a more suitable estimation we use
               an easy "greedy" heuristic. Let nodes 1, ..., i-1 are already
               assigned some colors. To assign a color to node i we see if there is
               an existing color not used for coloring nodes adjacent to node i. If
               so, we use this color, otherwise we introduce a new color. */

            set EE := setof{(i,j) in E} (i,j) union setof{(i,j) in E} (j,i);
            /* symmetrisized set of arcs */

            param z{i in V, case in 0..1} :=
            /* z[i,0] = color index assigned to node i
               z[i,1] = maximal color index used for nodes 1, 2, ..., i-1 which are
                        adjacent to node i */
            (  if case = 0 then
               (  /* compute z[i,0] */
                  min{c in 1..z[i,1]}
                  (  if not exists{j in V: j < i and (i,j) in EE} z[j,0] = c then
                        c
                     else
                        z[i,1] + 1
                  )
               )
               else
               (  /* compute z[i,1] */
                  if not exists{j in V: j < i} (i,j) in EE then
                     1
                  else
                     max{j in V: j < i and (i,j) in EE} z[j,0]
               )
            );

            check{(i,j) in E}: z[i,0] != z[j,0];
            /* check that all adjacent nodes are assigned distinct colors */

            param nc := max{i in V} z[i,0];
            /* number of colors used by the heuristic; obviously, it is an upper
               bound of the optimal solution */

            display nc;

            var x{i in V, c in 1..nc}, binary;
            /* x[i,c] = 1 means that node i is assigned color c */

            var u{c in 1..nc}, binary;
            /* u[c] = 1 means that color c is used, i.e. assigned to some node */

            s.t. map{i in V}: sum{c in 1..nc} x[i,c] = 1;
            /* each node must be assigned exactly one color */

            s.t. arc{(i,j) in E, c in 1..nc}: x[i,c] + x[j,c] <= u[c];
            /* adjacent nodes cannot be assigned the same color */

            minimize obj: sum{c in 1..nc} u[c];
            /* objective is to minimize the number of colors used */

            end;
        `,
        data: `
            data;

            /* These data correspond to the instance myciel3.col from:
               http://mat.gsia.cmu.edu/COLOR/instances.html */

            /* The optimal solution is 4 */

            param n := 11;

            set E :=
             1 2
             1 4
             1 7
             1 9
             2 3
             2 6
             2 8
             3 5
             3 7
             3 10
             4 5
             4 6
             4 10
             5 8
             5 9
             6 11
             7 11
             8 11
             9 11
             10 11
            ;

            end;
        `
    },
    {
        model: `
            /* plan.mod */
            
            var bin1, >= 0, <= 200;
            var bin2, >= 0, <= 2500;
            var bin3, >= 400, <= 800;
            var bin4, >= 100, <= 700;
            var bin5, >= 0, <= 1500;
            var alum, >= 0;
            var silicon, >= 0;
            
            minimize
            
            value: .03 * bin1 + .08 * bin2 + .17 * bin3 + .12 * bin4 + .15 * bin5 +
                   .21 * alum + .38 * silicon;
            
            subject to
            
            yield: bin1 + bin2 + bin3 + bin4 + bin5 + alum + silicon = 2000;
            
            fe: .15 * bin1 + .04 * bin2 + .02 * bin3 + .04 * bin4 + .02 * bin5 +
                .01 * alum + .03 * silicon <= 60;
            
            cu: .03 * bin1 + .05 * bin2 + .08 * bin3 + .02 * bin4 + .06 * bin5 +
                .01 * alum <= 100;
            
            mn: .02 * bin1 + .04 * bin2 + .01 * bin3 + .02 * bin4 + .02 * bin5
                <= 40;
            
            mg: .02 * bin1 + .03 * bin2 + .01 * bin5 <= 30;
            
            al: .70 * bin1 + .75 * bin2 + .80 * bin3 + .75 * bin4 + .80 * bin5 +
                .97 * alum >= 1500;
            
            si: 250 <= .02 * bin1 + .06 * bin2 + .08 * bin3 + .12 * bin4 +
                .02 * bin5 + .01 * alum + .97 * silicon <= 300;
            
            end;
            
            /* eof */
        `,
        data: `
        `
    },
    {
        model: `
            /* SPP, Shortest Path Problem */
            
            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */
            
            /* Given a directed graph G = (V,E), its edge lengths c(i,j) for all
               (i,j) in E, and two nodes s, t in V, the Shortest Path Problem (SPP)
               is to find a directed path from s to t whose length is minimal. */
            
            param n, integer, > 0;
            /* number of nodes */
            
            set E, within {i in 1..n, j in 1..n};
            /* set of edges */
            
            param c{(i,j) in E};
            /* c[i,j] is length of edge (i,j); note that edge lengths are allowed
               to be of any sign (positive, negative, or zero) */
            
            param s, in {1..n};
            /* source node */
            
            param t, in {1..n};
            /* target node */
            
            var x{(i,j) in E}, >= 0;
            /* x[i,j] = 1 means that edge (i,j) belong to shortest path;
               x[i,j] = 0 means that edge (i,j) does not belong to shortest path;
               note that variables x[i,j] are binary, however, there is no need to
               declare them so due to the totally unimodular constraint matrix */
            
            s.t. r{i in 1..n}: sum{(j,i) in E} x[j,i] + (if i = s then 1) =
                               sum{(i,j) in E} x[i,j] + (if i = t then 1);
            /* conservation conditions for unity flow from s to t; every feasible
               solution is a path from s to t */
            
            minimize Z: sum{(i,j) in E} c[i,j] * x[i,j];
            /* objective function is the path length to be minimized */
            
            end;
        `,
        data: `
            data;
            
            /* Optimal solution is 20 that corresponds to the following shortest
               path: s = 1 -> 2 -> 4 -> 8 -> 6 = t */
            
            param n := 8;
            
            param s := 1;
            
            param t := 6;
            
            param : E :   c :=
                   1 2    1
                   1 4    8
                   1 7    6
                   2 4    2
                   3 2   14
                   3 4   10
                   3 5    6
                   3 6   19
                   4 5    8
                   4 8   13
                   5 8   12
                   6 5    7
                   7 4    5
                   8 6    4
                   8 7   10;
            
            end;
        `
    },
    {
        model: `
            /* STIGLER, original Stigler's 1939 diet problem */

            /* The Stigler Diet is an optimization problem named for George Stigler,
               a 1982 Nobel Laureate in economics, who posed the following problem:
               For a moderately active man weighing 154 pounds, how much of each of
               77 foods should be eaten on a daily basis so that the man's intake of
               nine nutrients will be at least equal to the recommended dietary
               allowances (RDSs) suggested by the National Research Council in 1943,
               with the cost of the diet being minimal?

               The nutrient RDAs required to be met in Stigler's experiment were
               calories, protein, calcium, iron, vitamin A, thiamine, riboflavin,
               niacin, and ascorbic acid. The result was an annual budget allocated
               to foods such as evaporated milk, cabbage, dried navy beans, and beef
               liver at a cost of approximately $0.11 a day in 1939 U.S. dollars.

               While the name "Stigler Diet" was applied after the experiment by
               outsiders, according to Stigler, "No one recommends these diets for
               anyone, let alone everyone." The Stigler diet has been much ridiculed
               for its lack of variety and palatability, however his methodology has
               received praise and is considered to be some of the earliest work in
               linear programming.

               The Stigler diet question is a linear programming problem. Lacking
               any sophisticated method of solving such a problem, Stigler was
               forced to utilize heuristic methods in order to find a solution. The
               diet question originally asked in which quantities a 154 pound male
               would have to consume 77 different foods in order to fulfill the
               recommended intake of 9 different nutrients while keeping expense at
               a minimum. Through "trial and error, mathematical insight and
               agility," Stigler was able to eliminate 62 of the foods from the
               original 77 (these foods were removed based because they lacked
               nutrients in comparison to the remaining 15). From the reduced list,
               Stigler calculated the required amounts of each of the remaining 15
               foods to arrive at a cost-minimizing solution to his question.
               According to Stigler's calculations, the annual cost of his solution
               was $39.93 in 1939 dollars. When corrected for inflation using the
               consumer price index, the cost of the diet in 2005 dollars is
               $561.43. The specific combination of foods and quantities is as
               follows:

               Stigler's 1939 Diet

               Food             Annual Quantities Annual Cost
               ---------------- ----------------- -----------
               Wheat Flour           370 lb.         $13.33
               Evaporated Milk        57 cans          3.84
               Cabbage               111 lb.           4.11
               Spinach                23 lb.           1.85
               Dried Navy Beans      285 lb.          16.80
               ----------------------------------------------
               Total Annual Cost                     $39.93

               The 9 nutrients that Stigler's diet took into consideration and their
               respective recommended daily amounts were:

               Table of nutrients considered in Stigler's diet

               Nutrient                  Daily Recommended Intake
               ------------------------- ------------------------
               Calories                       3,000 Calories
               Protein                           70 grams
               Calcium                           .8 grams
               Iron                              12 milligrams
               Vitamin A                      5,000 IU
               Thiamine (Vitamin B1)            1.8 milligrams
               Riboflavin (Vitamin B2)          2.7 milligrams
               Niacin                            18 milligrams
               Ascorbic Acid (Vitamin C)         75 milligrams

               Seven years after Stigler made his initial estimates, the development
               of George Dantzig's Simplex algorithm made it possible to solve the
               problem without relying on heuristic methods. The exact value was
               determined to be $39.69 (using the original 1939 data). Dantzig's
               algorithm describes a method of traversing the vertices of a polytope
               of N+1 dimensions in order to find the optimal solution to a specific
               situation.

               (From Wikipedia, the free encyclopedia.) */

            /* Translated from GAMS by Andrew Makhorin <mao@gnu.org>.

               For the original GAMS model stigler1939.gms see [3].

               References:

               1. George J. Stigler, "The Cost of Subsistence," J. Farm Econ. 27,
                  1945, pp. 303-14.

               2. National Research Council, "Recommended Daily Allowances," Reprint
                  and Circular Series No. 115, January, 1943.

               3. Erwin Kalvelagen, "Model building with GAMS," Chapter 2, "Building
                  linear programming models," pp. 128-34. */

            set C;
            /* commodities */

            check card(C) = 77;
            /* there must be 77 commodities */

            set N;
            /* nutrients */

            param data{c in C, {"price", "weight"} union N};
            /* nutritive values per dollar of expenditure */

            param allowance{n in N};
            /* recommended daily allowance for a moderately active man */

            var x{c in C}, >= 0;
            /* dollars of food to be purchased daily */

            s.t. nb{n in N}: sum{c in C} data[c,n] * x[c] >= allowance[n];
            /* nutrient balance */

            minimize cost: sum{c in C} x[c];
            /* total food bill */

            solve;

            param days := 365.25;
            /* days in a year */

            param commodity{c in C}, symbolic;

            param unit{c in C}, symbolic;

            printf "\\n";
            printf "MINIMUM COST ANNUAL DIET\\n";
            printf "\\n";
            printf "        Commodity            Unit     Quantity     Cost   \\n";
            printf "------------------------- ---------- ---------- ----------\\n";
            printf{c in C: x[c] != 0} "%-25s %10s %10.2f   $%7.2f\\n", commodity[c],
               unit[c], 100 * days * x[c] / data[c,"price"], days * x[c];
            printf "                                         -----------------\\n";
            printf "                                         Total:   $%7.2f\\n",
               days * sum{c in C} x[c];
            printf "\\n";

            end;
        `,
        data: `
            data;

            param : C :    commodity                   unit :=
            flour          "Wheat Flour (Enriched)"    "10 lb."
            macaroni       "Macaroni"                  "1 lb."
            cereal         "Wheat Cereal (Enriched)"   "28 oz."
            cornflakes     "Corn Flakes"               "8 oz."
            cornmeal       "Corn Meal"                 "1 lb."
            grits          "Hominy Grits"              "24 oz."
            rice           "Rice"                      "1 lb."
            oats           "Rolled Oats"               "1 lb."
            whitebread     "White Bread (Enriched)"    "1 lb."
            wheatbread     "Whole Wheat Bread"         "1 lb."
            ryebread       "Rye Bread"                 "1 lb."
            poundcake      "Pound Cake"                "1 lb."
            crackers       "Soda Crackers"             "1 lb."
            milk           "Milk"                      "1 qt."
            evapmild       "Evaporated Milk (can)"     "14.5 oz."
            butter         "Butter"                    "1 lb."
            margarine      "Oleomargarine"             "1 lb."
            eggs           "Eggs"                      "1 doz."
            cheese         "Cheese (Cheddar)"          "1 lb."
            cream          "Cream"                     "1/2 pt."
            peanutbutter   "Peanut Butter"             "1 lb."
            mayonnaise     "Mayonnaise"                "1/2 pt."
            crisco         "Crisco"                    "1 lb."
            lard           "Lard"                      "1 lb."
            sirloinsteak   "Sirloin Steak"             "1 lb."
            roundsteak     "Round Steak"               "1 lb."
            ribroast       "Rib Roast"                 "1 lb."
            chuckroast     "Chuck Roast"               "1 lb."
            plate          "Plate"                     "1 lb."
            liver          "Liver (Beef)"              "1 lb."
            lambleg        "Leg of Lamb"               "1 lb."
            lambchops      "Lamb Chops (Rib)"          "1 lb."
            porkchops      "Pork Chops"                "1 lb."
            porkroast      "Pork Loin Roast"           "1 lb."
            bacon          "Bacon"                     "1 lb."
            ham            "Ham - smoked"              "1 lb."
            saltpork       "Salt Pork"                 "1 lb."
            chicken        "Roasting Chicken"          "1 lb."
            veal           "Veal Cutlets"              "1 lb."
            salmon         "Salmon, Pink (can)"        "16 oz."
            apples         "Apples"                    "1 lb."
            bananas        "Bananas"                   "1 lb."
            lemons         "Lemons"                    "1 doz."
            oranges        "Oranges"                   "1 doz."
            greenbeans     "Green Beans"               "1 lb."
            cabbage        "Cabbage"                   "1 lb."
            carrots        "Carrots"                   "1 bunch"
            celery         "Celery"                    "1 stalk"
            lettuce        "Lettuce"                   "1 head"
            onions         "Onions"                    "1 lb."
            potatoes       "Potatoes"                  "15 lb."
            spinach        "Spinach"                   "1 lb."
            sweetpotato    "Sweet Potatoes"            "1 lb."
            peaches        "Peaches (can)"             "No. 2 1/2"
            pears          "Pears (can)"               "No. 2 1/2"
            pineapple      "Pineapple (can)"           "No. 2 1/2"
            asparagus      "Asparagus (can)"           "No. 2"
            cannedgrbn     "Grean Beans (can)"         "No. 2"
            porkbeans      "Pork and Beans (can)"      "16 oz."
            corn           "Corn (can)"                "No. 2"
            peas           "Peas (can)"                "No. 2"
            tomatoes       "Tomatoes (can)"            "No. 2"
            tomatosoup     "Tomato Soup (can)"         "10 1/2 oz."
            driedpeach     "Peaches, Dried"            "1 lb."
            prunes         "Prunes, Dried"             "1 lb."
            raisins        "Raisins, Dried"            "15 oz."
            driedpeas      "Peas, Dried"               "1 lb."
            limabeans      "Lima Beans, Dried"         "1 lb."
            navybeans      "Navy Beans, Dried"         "1 lb."
            coffee         "Coffee"                    "1 lb."
            tea            "Tea"                       "1/4 lb."
            cocoa          "Cocoa"                     "8 oz."
            chocolate      "Chocolate"                 "8 oz."
            sugar          "Sugar"                     "10 lb."
            cornsirup      "Corn Sirup"                "24 oz."
            molasses       "Molasses"                  "18 oz."
            stawberry      "Strawberry Preserve"       "1 lb."
            ;

            set N :=
            calories       /* Calories, unit = 1000 */
            protein        /* Protein, unit = grams */
            calcium        /* Calcium, unit = grams */
            iron           /* Iron, unit = milligrams */
            vitaminA       /* Vitamin A, unit = 1000 International Units */
            thiamine       /* Thiamine, Vit. B1, unit = milligrams */
            riboflavin     /* Riboflavin, Vit. B2, unit = milligrams */
            niacin         /* Niacin (Nicotinic Acid), unit = milligrams */
            ascorbicAcid   /* Ascorbic Acid, Vit. C, unit = milligrams */
            ;

            param data
            :             price   weight calories protein  calcium   iron :=
            #            aug. 15  edible
            #             1939    per $1
            #           (cents)   (grams) (1000)  (grams)  (grams)   (mg.)
            flour         36.0    12600    44.7     1411     2.0      365
            macaroni      14.1     3217    11.6      418      .7       54
            cereal        24.2     3280    11.8      377    14.4      175
            cornflakes     7.1     3194    11.4      252      .1       56
            cornmeal       4.6     9861    36.0      897     1.7       99
            grits          8.5     8005    28.6      680      .8       80
            rice           7.5     6048    21.2      460      .6       41
            oats           7.1     6389    25.3      907     5.1      341
            whitebread     7.9     5742    15.6      488     2.5      115
            wheatbread     9.1     4985    12.2      484     2.7      125
            ryebread       9.2     4930    12.4      439     1.1       82
            poundcake     24.8     1829     8.0      130      .4       31
            crackers      15.1     3004    12.5      288      .5       50
            milk          11.0     8867     6.1      310    10.5       18
            evapmild       6.7     6035     8.4      422    15.1        9
            butter        20.8     1473    10.8        9      .2        3
            margarine     16.1     2817    20.6       17      .6        6
            eggs          32.6     1857     2.9      238     1.0       52
            cheese        24.2     1874     7.4      448    16.4       19
            cream         14.1     1689     3.5       49     1.7        3
            peanutbutter  17.9     2534    15.7      661     1.0       48
            mayonnaise    16.7     1198     8.6       18      .2        8
            crisco        20.3     2234    20.1        0      .0        0
            lard           9.8     4628    41.7        0      .0        0
            sirloinsteak  39.6     1145     2.9      166      .1       34
            roundsteak    36.4     1246     2.2      214      .1       32
            ribroast      29.2     1553     3.4      213      .1       33
            chuckroast    22.6     2007     3.6      309      .2       46
            plate         14.6     3107     8.5      404      .2       62
            liver         26.8     1692     2.2      333      .2      139
            lambleg       27.6     1643     3.1      245      .1       20
            lambchops     36.6     1239     3.3      140      .1       15
            porkchops     30.7     1477     3.5      196      .2       80
            porkroast     24.2     1874     4.4      249      .3       37
            bacon         25.6     1772    10.4      152      .2       23
            ham           27.4     1655     6.7      212      .2       31
            saltpork      16.0     2835    18.8      164      .1       26
            chicken       30.3     1497     1.8      184      .1       30
            veal          42.3     1072     1.7      156      .1       24
            salmon        13.0     3489     5.8      705     6.8       45
            apples         4.4     9072     5.8       27      .5       36
            bananas        6.1     4982     4.9       60      .4       30
            lemons        26.0     2380     1.0       21      .5       14
            oranges       30.9     4439     2.2       40     1.1       18
            greenbeans     7.1     5750     2.4      138     3.7       80
            cabbage        3.7     8949     2.6      125     4.0       36
            carrots        4.7     6080     2.7       73     2.8       43
            celery         7.3     3915      .9       51     3.0       23
            lettuce        8.2     2247      .4       27     1.1       22
            onions         3.6    11844     5.8      166     3.8       59
            potatoes      34.0    16810    14.3      336     1.8      118
            spinach        8.1     4592     1.1      106      .0      138
            sweetpotato    5.1     7649     9.6      138     2.7       54
            peaches       16.8     4894     3.7       20      .4       10
            pears         20.4     4030     3.0        8      .3        8
            pineapple     21.3     3993     2.4       16      .4        8
            asparagus     27.7     1945      .4       33      .3       12
            cannedgrbn    10.0     5386     1.0       54     2.0       65
            porkbeans      7.1     6389     7.5      364     4.0      134
            corn          10.4     5452     5.2      136      .2       16
            peas          13.8     4109     2.3      136      .6       45
            tomatoes       8.6     6263     1.3       63      .7       38
            tomatosoup     7.6     3917     1.6       71      .6       43
            driedpeach    15.7     2889     8.5       87     1.7      173
            prunes         9.0     4284    12.8       99     2.5      154
            raisins        9.4     4524    13.5      104     2.5      136
            driedpeas      7.9     5742    20.0     1367     4.2      345
            limabeans      8.9     5097    17.4     1055     3.7      459
            navybeans      5.9     7688    26.9     1691    11.4      792
            coffee        22.4     2025      .0        0      .0        0
            tea           17.4      652      .0        0      .0        0
            cocoa          8.6     2637     8.7      237     3.0       72
            chocolate     16.2     1400     8.0       77     1.3       39
            sugar         51.7     8773    34.9        0      .0        0
            cornsirup     13.7     4996    14.7        0      .5       74
            molasses      13.6     3752     9.0        0    10.3      244
            stawberry     20.5     2213     6.4       11      .4        7

            :           vitaminA thiamine riboflavin  niacin  ascorbicAcid :=
            #          (1000 IU)  (mg.)      (mg.)     (mg.)     (mg.)
            flour           .0    55.4       33.3       441         0
            macaroni        .0     3.2        1.9        68         0
            cereal          .0    14.4        8.8       114         0
            cornflakes      .0    13.5        2.3        68         0
            cornmeal      30.9    17.4        7.9       106         0
            grits           .0    10.6        1.6       110         0
            rice            .0     2.0        4.8        60         0
            oats            .0    37.1        8.9        64         0
            whitebread      .0    13.8        8.5       126         0
            wheatbread      .0    13.9        6.4       160         0
            ryebread        .0     9.9        3.0        66         0
            poundcake     18.9     2.8        3.0        17         0
            crackers        .0      .0         .0         0         0
            milk          16.8     4.0       16.0         7       177
            evapmild      26.0     3.0       23.5        11        60
            butter        44.2      .0         .2         2         0
            margarine     55.8      .2         .0         0         0
            eggs          18.6     2.8        6.5         1         0
            cheese        28.1      .8       10.3         4         0
            cream         16.9      .6        2.5         0        17
            peanutbutter    .0     9.6        8.1       471         0
            mayonnaise     2.7      .4         .5         0         0
            crisco          .0      .0         .0         0         0
            lard            .2      .0         .5         5         0
            sirloinsteak    .2     2.1        2.9        69         0
            roundsteak      .4     2.5        2.4        87         0
            ribroast        .0      .0        2.0         0         0
            chuckroast      .4     1.0        4.0       120         0
            plate           .0      .9         .0         0         0
            liver        169.2     6.4       50.8       316       525
            lambleg         .0     2.8        3.0        86         0
            lambchops       .0     1.7        2.7        54         0
            porkchops       .0    17.4        2.7        60         0
            porkroast       .0    18.2        3.6        79         0
            bacon           .0     1.8        1.8        71         0
            ham             .0     9.9        3.3        50         0
            saltpork        .0     1.4        1.8         0         0
            chicken         .1      .9        1.8        68        46
            veal            .0     1.4        2.4        57         0
            salmon         3.5     1.0        4.9       209         0
            apples         7.3     3.6        2.7         5       544
            bananas       17.4     2.5        3.5        28       498
            lemons          .0      .5         .0         4       952
            oranges       11.1     3.6        1.3        10      1993
            greenbeans    69.0     4.3        5.8        37       862
            cabbage        7.2     9.0        4.5        26      5369
            carrots      188.5     6.1        4.3        89       608
            celery          .9     1.4        1.4         9       313
            lettuce      112.4     1.8        3.4        11       449
            onions        16.6     4.7        5.9        21      1184
            potatoes       6.7    29.4        7.1       198      2522
            spinach      918.4     5.7       13.8        33      2755
            sweetpotato  290.7     8.4        5.4        83      1912
            peaches       21.5      .5        1.0        31       196
            pears           .8      .8         .8         5        81
            pineapple      2.0     2.8         .8         7       399
            asparagus     16.3     1.4        2.1        17       272
            cannedgrbn    53.9     1.6        4.3        32       431
            porkbeans      3.5     8.3        7.7        56         0
            corn          12.0     1.6        2.7        42       218
            peas          34.9     4.9        2.5        37       370
            tomatoes      53.2     3.4        2.5        36      1253
            tomatosoup    57.9     3.5        2.4        67       862
            driedpeach    86.8     1.2        4.3        55        57
            prunes        85.7     3.9        4.3        65       257
            raisins        4.5     6.3        1.4        24       136
            driedpeas      2.9    28.7       18.4       162         0
            limabeans      5.1    26.9       38.2        93         0
            navybeans       .0    38.4       24.6       217         0
            coffee          .0     4.0        5.1        50         0
            tea             .0      .0        2.3        42         0
            cocoa           .0     2.0       11.9        40         0
            chocolate       .0      .9        3.4        14         0
            sugar           .0      .0         .0         0         0
            cornsirup       .0      .0         .0         5         0
            molasses        .0     1.9        7.5       146         0
            stawberry       .2      .2         .4         3         0
            ;

            param allowance :=
            calories       3
            protein       70
            calcium         .8
            iron          12
            vitaminA       5
            thiamine       1.8
            riboflavin     2.7
            niacin        18
            ascorbicAcid  75
            ;

            end;
        `
    },
    {
        model: `
            /* File: shiftcover.mod */
            
            /* WORKFORCE SHIFT COVERAGE assignment problem */
            
            /* Written by Larry D'Agostino <larrydag -at- sbcglobal -dot- com>
                 
                 Maximize Productivity with Industrial Engineer and Operations Research Tools
                 http://industrialengineertools.blogspot.com
            
            
            /* The WORKFORCE SHIFT COVERAGE is an assigment problem that determines
               the schedule of crew given available time and shifts. 
               
               The objective is to cover the available time given hourly demand with the minimum
                number of crew members.
               
                This is a set covering problem that is very common among finding crew
                 and shift allocations.  Notice in the data section the workforce shift allocation
                 per day of the week.*/
            
            
            /* ----- Model PARAMTERS and SETS -----*/
            
            param numhrs;
            /* number of hours of operations in a given day */
            
            param dys;
            /* number of days in a week */
            
            set S;
            /* set of crew shifts */
            
            set H := 1..numhrs;
            /* set of hours of a day*/
            
            set D;
            /* set of days of a week*/
            
            param dmnd{h in H, d in D};
            /* demand for crew members given h hour and d day */
            
            param shifts{d in D, h in H, s in S};
            /* shifts to assign to crew members given d day, h hour, and s shift schedule
            
            /*----- Model VARIABLES -----*/
            
            var crew{s in S}, integer, >=0;
            /*  number of crew assigned to shift S */
            
            
            /*----- Model CONSTRAINTS -----*/
            
            s.t. Coverage{h in H, d in D}: sum{s in S} crew[s]*shifts[d,h,s] >= dmnd[h,d];
            /* number of crew to cover with a shift  given hourly demand and day */
            
            
            /*----- Model OBJECTIVE -----*/
            
            minimize obj: sum{s in S} crew[s];
            /* minimize number of crew to cover demand*/
            
            solve;
            display crew;
            
            printf "\\n";
            printf "Total Crew: %3d\\n\\n", sum{s in S} crew[s];
            
            
            
            printf "\\n\\n";
            printf "Weekly Crew Schedule\\n\\n";
            printf "Hour ";
            printf{d in D} "  %s  ", d;
            printf "\\n";
            for {h in H} {
              printf " %2s  ",h;
              printf{d in D} " %3d   ", sum{s in S} crew[s]*shifts[d,h,s];
              printf "\\n";
            }
            printf"\\n";
            
            end;
        `,
        data: `
            data;
            
            param numhrs := 16;
            
            set D := SUN, MON, TUE, WED, THU, FRI, SAT;
            
            set S := Sh1, Sh2, Sh3, Sh4, Sh5, Sh6, Sh7, Sh8, Sh9;
            
            param dmnd :   SUN  MON     TUE     WED     THU     FRI     SAT :=
            1               0   3       3       4       3       2       0
            2               0   14      14      16      14      12      12
            3               0   24      24      27      24      20      15
            4               0   28      28      32      28      23      15
            5               0   33      33      37      33      24      16
            6               0   34      34      38      34      24      15
            7               0   35      35      39      35      25      11
            8               0   35      35      40      35      27      0
            9               0   34      34      39      34      25      0
            10              0   31      31      35      31      24      0
            11              2   24      24      27      24      25      0
            12              3   19      19      21      19      21      0
            13              2   24      24      27      24      13      0
            14              2   16      16      18      16      0       0
            15              0   7       7       7       7       0       0
            16              0   5       5       5       5       0       0;
            
            
            param shifts :=
            ['SUN',*,*]:
                               Sh1  Sh2  Sh3  Sh4  Sh5  Sh6  Sh7  Sh8  Sh9 :=
            1                   0    0    0    0    0    0    0    0    0
            2                   0    0    0    0    0    0    0    0    0
            3                   0    0    0    0    0    0    0    0    0
            4                   0    0    0    0    0    0    0    0    0
            5                   0    0    0    0    0    0    0    0    0
            6                   0    0    0    0    0    0    0    0    0
            7                   0    0    0    0    0    0    0    0    0
            8                   0    0    0    0    0    0    0    0    0
            9                   0    0    0    0    0    0    0    0    0
            10                  0    0    0    0    0    0    0    0    0
            11                  0    0    0    0    0    0    0    0    1
            12                  0    0    0    0    0    0    0    0    1
            13                  0    0    0    0    0    0    0    0    1
            14                  0    0    0    0    0    0    0    0    1
            15                  0    0    0    0    0    0    0    0    0
            16                  0    0    0    0    0    0    0    0    0
            
            
            ['MON',*,*]:
                               Sh1  Sh2  Sh3  Sh4  Sh5  Sh6  Sh7  Sh8  Sh9 :=
            1                   1    0    0    0    0    0    0    0    0
            2                   1    1    0    0    0    0    0    0    0
            3                   1    1    1    0    0    0    0    0    0
            4                   1    1    1    1    0    0    0    0    0
            5                   0    1    1    1    1    0    0    0    0
            6                   1    0    1    1    1    1    0    0    1
            7                   1    1    0    1    1    1    1    0    1
            8                   1    1    1    0    1    1    1    1    1
            9                   1    1    1    1    0    1    1    1    1
            10                  0    1    1    1    1    0    1    1    1
            11                  0    0    1    1    1    1    0    1    0
            12                  0    0    0    1    1    1    1    0    1
            13                  0    0    0    0    1    1    1    1    1
            14                  0    0    0    0    0    1    1    1    1
            15                  0    0    0    0    0    0    1    1    1
            16                  0    0    0    0    0    0    0    1    1
            
            ['TUE',*,*]:
                               Sh1  Sh2  Sh3  Sh4  Sh5  Sh6  Sh7  Sh8  Sh9 :=
            1                   1    0    0    0    0    0    0    0    0
            2                   1    1    0    0    0    0    0    0    0
            3                   1    1    1    0    0    0    0    0    0
            4                   1    1    1    1    0    0    0    0    0
            5                   0    1    1    1    1    0    0    0    0
            6                   1    0    1    1    1    1    0    0    1
            7                   1    1    0    1    1    1    1    0    1
            8                   1    1    1    0    1    1    1    1    1
            9                   1    1    1    1    0    1    1    1    1
            10                  0    1    1    1    1    0    1    1    1
            11                  0    0    1    1    1    1    0    1    0
            12                  0    0    0    1    1    1    1    0    1
            13                  0    0    0    0    1    1    1    1    1
            14                  0    0    0    0    0    1    1    1    1
            15                  0    0    0    0    0    0    1    1    1
            16                  0    0    0    0    0    0    0    1    1
            
            ['WED',*,*]:
                               Sh1  Sh2  Sh3  Sh4  Sh5  Sh6  Sh7  Sh8  Sh9 :=
            1                   1    0    0    0    0    0    0    0    0
            2                   1    1    0    0    0    0    0    0    0
            3                   1    1    1    0    0    0    0    0    0
            4                   1    1    1    1    0    0    0    0    0
            5                   0    1    1    1    1    0    0    0    0
            6                   1    0    1    1    1    1    0    0    1
            7                   1    1    0    1    1    1    1    0    1
            8                   1    1    1    0    1    1    1    1    1
            9                   1    1    1    1    0    1    1    1    1
            10                  0    1    1    1    1    0    1    1    1
            11                  0    0    1    1    1    1    0    1    0
            12                  0    0    0    1    1    1    1    0    1
            13                  0    0    0    0    1    1    1    1    1
            14                  0    0    0    0    0    1    1    1    1
            15                  0    0    0    0    0    0    1    1    1
            16                  0    0    0    0    0    0    0    1    1
            
            ['THU',*,*]:
                               Sh1  Sh2  Sh3  Sh4  Sh5  Sh6  Sh7  Sh8  Sh9 :=
            1                   1    0    0    0    0    0    0    0    0
            2                   1    1    0    0    0    0    0    0    0
            3                   1    1    1    0    0    0    0    0    0
            4                   1    1    1    1    0    0    0    0    0
            5                   0    1    1    1    1    0    0    0    0
            6                   1    0    1    1    1    1    0    0    0
            7                   1    1    0    1    1    1    1    0    0
            8                   1    1    1    0    1    1    1    1    0
            9                   1    1    1    1    0    1    1    1    0
            10                  0    1    1    1    1    0    1    1    0
            11                  0    0    1    1    1    1    0    1    0
            12                  0    0    0    1    1    1    1    0    0
            13                  0    0    0    0    1    1    1    1    0
            14                  0    0    0    0    0    1    1    1    0
            15                  0    0    0    0    0    0    1    1    0
            16                  0    0    0    0    0    0    0    1    0
            
            ['FRI',*,*]:
                               Sh1  Sh2  Sh3  Sh4  Sh5  Sh6  Sh7  Sh8  Sh9 :=
            1                   1    0    0    0    0    0    0    0    0
            2                   1    1    0    0    0    0    0    0    0
            3                   1    1    1    0    0    0    0    0    0
            4                   1    1    1    1    0    0    0    0    0
            5                   0    1    1    1    1    0    0    0    0
            6                   1    0    1    1    1    1    0    0    0
            7                   1    1    0    1    1    1    1    0    0
            8                   1    1    1    0    1    1    1    1    0
            9                   1    1    1    1    0    1    1    1    0
            10                  0    1    1    1    1    0    1    1    0
            11                  0    0    1    1    1    1    0    1    0
            12                  0    0    0    1    1    1    1    0    0
            13                  0    0    0    0    1    1    1    1    0
            14                  0    0    0    0    0    1    1    1    0
            15                  0    0    0    0    0    0    1    1    0
            16                  0    0    0    0    0    0    0    1    0
            
            ['SAT',*,*]:
                               Sh1  Sh2  Sh3  Sh4  Sh5  Sh6  Sh7  Sh8  Sh9 :=
            1                   0    0    0    0    0    0    0    0    0
            2                   0    0    0    0    0    0    0    0    1
            3                   0    0    0    0    0    0    0    0    1
            4                   0    0    0    0    0    0    0    0    1
            5                   0    0    0    0    0    0    0    0    1
            6                   0    0    0    0    0    0    0    0    1
            7                   0    0    0    0    0    0    0    0    1
            8                   0    0    0    0    0    0    0    0    0
            9                   0    0    0    0    0    0    0    0    0
            10                  0    0    0    0    0    0    0    0    0
            11                  0    0    0    0    0    0    0    0    0
            12                  0    0    0    0    0    0    0    0    0
            13                  0    0    0    0    0    0    0    0    0
            14                  0    0    0    0    0    0    0    0    0
            15                  0    0    0    0    0    0    0    0    0
            16                  0    0    0    0    0    0    0    0    0;

            end;
        `
    },
    {
        model: `
            /* CRYPTO, a crypto-arithmetic puzzle */

            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

            /* This problem comes from the newsgroup rec.puzzle.
               The numbers from 1 to 26 are assigned to the letters of the alphabet.
               The numbers beside each word are the total of the values assigned to
               the letters in the word (e.g. for LYRE: L, Y, R, E might be to equal
               5, 9, 20 and 13, or any other combination that add up to 47).
               Find the value of each letter under the equations:

               BALLET  45     GLEE  66     POLKA      59     SONG     61
               CELLO   43     JAZZ  58     QUARTET    50     SOPRANO  82
               CONCERT 74     LYRE  47     SAXOPHONE 134     THEME    72
               FLUTE   30     OBOE  53     SCALE      51     VIOLIN  100
               FUGUE   50     OPERA 65     SOLO       37     WALTZ    34

               Solution:
               A, B,C, D, E,F, G, H, I, J, K,L,M, N, O, P,Q, R, S,T,U, V,W, X, Y, Z
               5,13,9,16,20,4,24,21,25,17,23,2,8,12,10,19,7,11,15,3,1,26,6,22,14,18

               Reference:
               Koalog Constraint Solver <http://www.koalog.com/php/jcs.php>,
               Simple problems, the crypto-arithmetic puzzle ALPHACIPHER. */

            set LETTERS :=
            {     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            };
            /* set of letters */

            set VALUES := 1..card(LETTERS);
            /* set of values assigned to the letters */

            set WORDS;
            /* set of words */

            param total{word in WORDS};
            /* total[word] is the total of the values assigned to the letters in
               the word */

            var x{i in LETTERS, j in VALUES}, binary;
            /* x[i,j] = 1 means that letter i is assigned value j */

            s.t. phi{i in LETTERS}: sum{j in VALUES} x[i,j] = 1;

            s.t. psi{j in VALUES}: sum{i in LETTERS} x[i,j] = 1;

            s.t. eqn{word in WORDS}: sum{k in 1..length(word), j in VALUES}
                  j * x[substr(word,k,1), j] = total[word];

            solve;

            printf{i in LETTERS} "  %s", i;
            printf "\\n";

            printf{i in LETTERS} " %2d", sum{j in VALUES} j * x[i,j];
            printf "\\n";

            end;
        `,
        data: `
            data;

            param :  WORDS :   total :=
                     BALLET       45
                     CELLO        43
                     CONCERT      74
                     FLUTE        30
                     FUGUE        50
                     GLEE         66
                     JAZZ         58
                     LYRE         47
                     OBOE         53
                     OPERA        65
                     POLKA        59
                     QUARTET      50
                     SAXOPHONE   134
                     SCALE        51
                     SOLO         37
                     SONG         61
                     SOPRANO      82
                     THEME        72
                     VIOLIN      100
                     WALTZ        34 ;

            end;
        `
    },
    {
        model: `
            /* ASSIGN, Assignment Problem */

            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

            /* The assignment problem is one of the fundamental combinatorial
               optimization problems.

               In its most general form, the problem is as follows:

               There are a number of agents and a number of tasks. Any agent can be
               assigned to perform any task, incurring some cost that may vary
               depending on the agent-task assignment. It is required to perform all
               tasks by assigning exactly one agent to each task in such a way that
               the total cost of the assignment is minimized.

               (From Wikipedia, the free encyclopedia.) */

            param m, integer, > 0;
            /* number of agents */

            param n, integer, > 0;
            /* number of tasks */

            set I := 1..m;
            /* set of agents */

            set J := 1..n;
            /* set of tasks */

            param c{i in I, j in J}, >= 0;
            /* cost of allocating task j to agent i */

            var x{i in I, j in J}, >= 0;
            /* x[i,j] = 1 means task j is assigned to agent i
               note that variables x[i,j] are binary, however, there is no need to
               declare them so due to the totally unimodular constraint matrix */

            s.t. phi{i in I}: sum{j in J} x[i,j] <= 1;
            /* each agent can perform at most one task */

            s.t. psi{j in J}: sum{i in I} x[i,j] = 1;
            /* each task must be assigned exactly to one agent */

            minimize obj: sum{i in I, j in J} c[i,j] * x[i,j];
            /* the objective is to find a cheapest assignment */

            solve;

            printf "\\n";
            printf "Agent  Task       Cost\\n";
            printf{i in I} "%5d %5d %10g\\n", i, sum{j in J} j * x[i,j],
               sum{j in J} c[i,j] * x[i,j];
            printf "----------------------\\n";
            printf "     Total: %10g\\n", sum{i in I, j in J} c[i,j] * x[i,j];
            printf "\\n";

            end;
        `,
        data: `
            data;

            /* These data correspond to an example from [Christofides]. */

            /* Optimal solution is 76 */

            param m := 8;

            param n := 8;

            param c : 1  2  3  4  5  6  7  8 :=
                  1  13 21 20 12  8 26 22 11
                  2  12 36 25 41 40 11  4  8
                  3  35 32 13 36 26 21 13 37
                  4  34 54  7  8 12 22 11 40
                  5  21  6 45 18 24 34 12 48
                  6  42 19 39 15 14 16 28 46
                  7  16 34 38  3 34 40 22 24
                  8  26 20  5 17 45 31 37 43 ;

            end;
        `
    },
    {
        model: `
            /* FCTP, Fixed-Charge Transportation Problem */
            
            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */
            
            /* The Fixed-Charge Transportation Problem (FCTP) is obtained from
               classical transportation problem by imposing a fixed cost on each
               transportation link if there is a positive flow on that link. */
            
            param m, integer, > 0;
            /* number of sources */
            
            param n, integer, > 0;
            /* number of customers */
            
            set I := 1..m;
            /* set of sources */
            
            set J := 1..n;
            /* set of customers */
            
            param supply{i in I}, >= 0;
            /* supply at source i */
            
            param demand{j in J}, >= 0;
            /* demand at customer j */
            
            param varcost{i in I, j in J}, >= 0;
            /* variable cost (a cost per one unit shipped from i to j) */
            
            param fixcost{i in I, j in J}, >= 0;
            /* fixed cost (a cost for shipping any amount from i to j) */
            
            var x{i in I, j in J}, >= 0;
            /* amount shipped from source i to customer j */
            
            s.t. f{i in I}: sum{j in J} x[i,j] = supply[i];
            /* observe supply at source i */
            
            s.t. g{j in J}: sum{i in I} x[i,j] = demand[j];
            /* satisfy demand at customer j */
            
            var y{i in I, j in J}, binary;
            /* y[i,j] = 1 means some amount is shipped from i to j */
            
            s.t. h{i in I, j in J}: x[i,j] <= min(supply[i], demand[j]) * y[i,j];
            /* if y[i,j] is 0, force x[i,j] to be 0 (may note that supply[i] and
               demand[j] are implicit upper bounds for x[i,j] as follows from the
               constraints f[i] and g[j]) */
            
            minimize cost: sum{i in I, j in J} varcost[i,j] * x[i,j] +
                           sum{i in I, j in J} fixcost[i,j] * y[i,j];
            /* total transportation costs */
            
            end;
        `,
        data: `
            data;
            
            /* These data correspond to the instance bal8x12 from [Balinski]. */
            
            /* The optimal solution is 471.55 */
            
            param m := 8;
            
            param n := 12;
            
            param supply := 1 15.00,  2 20.00,  3 45.00,  4 35.00,
                            5 25.00,  6 35.00,  7 10.00,  8 25.00;
            
            param demand := 1 20.00,  2 15.00,  3 20.00,  4 15.00,
                            5  5.00,  6 20.00,  7 30.00,  8 10.00,
                            9 35.00, 10 25.00, 11 10.00, 12  5.00;
            
            param varcost
                  :   1    2    3    4    5    6    7    8    9    10   11   12  :=
                  1  0.69 0.64 0.71 0.79 1.70 2.83 2.02 5.64 5.94 5.94 5.94 7.68
                  2  1.01 0.75 0.88 0.59 1.50 2.63 2.26 5.64 5.85 5.62 5.85 4.94
                  3  1.05 1.06 1.08 0.64 1.22 2.37 1.66 5.64 5.91 5.62 5.91 4.94
                  4  1.94 1.50 1.56 1.22 1.98 1.98 1.36 6.99 6.99 6.99 6.99 3.68
                  5  1.61 1.40 1.61 1.33 1.68 2.83 1.54 4.26 4.26 4.26 4.26 2.99
                  6  5.29 5.94 6.08 5.29 5.96 6.77 5.08 0.31 0.21 0.17 0.31 1.53
                  7  5.29 5.94 6.08 5.29 5.96 6.77 5.08 0.55 0.35 0.40 0.19 1.53
                  8  5.29 6.08 6.08 5.29 5.96 6.45 5.08 2.43 2.30 2.33 1.81 2.50 ;
            
            param fixcost
                  :   1    2    3    4    5    6    7    8    9    10   11   12  :=
                  1  11.0 16.0 18.0 17.0 10.0 20.0 17.0 13.0 15.0 12.0 14.0 14.0
                  2  14.0 17.0 17.0 13.0 15.0 13.0 16.0 11.0 20.0 11.0 15.0 10.0
                  3  12.0 13.0 20.0 17.0 13.0 15.0 16.0 13.0 12.0 13.0 10.0 18.0
                  4  16.0 19.0 16.0 11.0 15.0 12.0 18.0 12.0 18.0 13.0 13.0 14.0
                  5  19.0 18.0 15.0 16.0 12.0 14.0 20.0 19.0 11.0 17.0 16.0 18.0
                  6  13.0 20.0 20.0 17.0 15.0 12.0 14.0 11.0 12.0 19.0 15.0 16.0
                  7  11.0 12.0 15.0 10.0 17.0 11.0 11.0 16.0 10.0 18.0 17.0 12.0
                  8  17.0 10.0 20.0 12.0 17.0 20.0 16.0 15.0 10.0 12.0 16.0 18.0 ;
            
            end;
        `
    },
    {
        model: `
            /* MAXCUT, Maximum Cut Problem */

            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

            /* The Maximum Cut Problem in a network G = (V, E), where V is a set
               of nodes, E is a set of edges, is to find the partition of V into
               disjoint sets V1 and V2, which maximizes the sum of edge weights
               w(e), where edge e has one endpoint in V1 and other endpoint in V2.

               Reference:
               Garey, M.R., and Johnson, D.S. (1979), Computers and Intractability:
               A guide to the theory of NP-completeness [Network design, Cuts and
               Connectivity, Maximum Cut, ND16]. */

            set E, dimen 2;
            /* set of edges */

            param w{(i,j) in E}, >= 0, default 1;
            /* w[i,j] is weight of edge (i,j) */

            set V := (setof{(i,j) in E} i) union (setof{(i,j) in E} j);
            /* set of nodes */

            var x{i in V}, binary;
            /* x[i] = 0 means that node i is in set V1
               x[i] = 1 means that node i is in set V2 */

            /* We need to include in the objective function only that edges (i,j)
               from E, for which x[i] != x[j]. This can be modeled through binary
               variables s[i,j] as follows:

                  s[i,j] = x[i] xor x[j] = (x[i] + x[j]) mod 2,                  (1)

               where s[i,j] = 1 iff x[i] != x[j], that leads to the following
               objective function:

                  z = sum{(i,j) in E} w[i,j] * s[i,j].                           (2)

               To describe "exclusive or" (1) we could think that s[i,j] is a minor
               bit of the sum x[i] + x[j]. Then introducing binary variables t[i,j],
               which represent a major bit of the sum x[i] + x[j], we can write:

                  x[i] + x[j] = s[i,j] + 2 * t[i,j].                             (3)

               An easy check shows that conditions (1) and (3) are equivalent.

               Note that condition (3) can be simplified by eliminating variables
               s[i,j]. Indeed, from (3) it follows that:

                  s[i,j] = x[i] + x[j] - 2 * t[i,j].                             (4)

               Since the expression in the right-hand side of (4) is integral, this
               condition can be rewritten in the equivalent form:

                  0 <= x[i] + x[j] - 2 * t[i,j] <= 1.                            (5)

               (One might note that (5) means t[i,j] = x[i] and x[j].)

               Substituting s[i,j] from (4) to (2) leads to the following objective
               function:

                  z = sum{(i,j) in E} w[i,j] * (x[i] + x[j] - 2 * t[i,j]),       (6)

               which does not include variables s[i,j]. */

            var t{(i,j) in E}, binary;
            /* t[i,j] = x[i] and x[j] = (x[i] + x[j]) div 2 */

            s.t. xor{(i,j) in E}: 0 <= x[i] + x[j] - 2 * t[i,j] <= 1;
            /* see (4) */

            maximize z: sum{(i,j) in E} w[i,j] * (x[i] + x[j] - 2 * t[i,j]);
            /* see (6) */

            end;
        `,
        data: `
            data;

            /* In this example the network has 15 nodes and 22 edges. */

            /* Optimal solution is 20 */

            set E :=
               1 2, 1 5, 2 3, 2 6, 3 4, 3 8, 4 9, 5 6, 5 7, 6 8, 7 8, 7 12, 8 9,
               8 12, 9 10, 9 14, 10 11, 10 14, 11 15, 12 13, 13 14, 14 15;

            end;
        `
    },
    {
        model: `
            /* MAXFLOW, Maximum Flow Problem */

            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

            /* The Maximum Flow Problem in a network G = (V, E), where V is a set
               of nodes, E within V x V is a set of arcs, is to maximize the flow
               from one given node s (source) to another given node t (sink) subject
               to conservation of flow constraints at each node and flow capacities
               on each arc. */

            param n, integer, >= 2;
            /* number of nodes */

            set V, default {1..n};
            /* set of nodes */

            set E, within V cross V;
            /* set of arcs */

            param a{(i,j) in E}, > 0;
            /* a[i,j] is capacity of arc (i,j) */

            param s, symbolic, in V, default 1;
            /* source node */

            param t, symbolic, in V, != s, default n;
            /* sink node */

            var x{(i,j) in E}, >= 0, <= a[i,j];
            /* x[i,j] is elementary flow through arc (i,j) to be found */

            var flow, >= 0;
            /* total flow from s to t */

            s.t. node{i in V}:
            /* node[i] is conservation constraint for node i */

               sum{(j,i) in E} x[j,i] + (if i = s then flow)
               /* summary flow into node i through all ingoing arcs */

               = /* must be equal to */

               sum{(i,j) in E} x[i,j] + (if i = t then flow);
               /* summary flow from node i through all outgoing arcs */

            maximize obj: flow;
            /* objective is to maximize the total flow through the network */

            solve;

            printf{1..56} "="; printf "\\n";
            printf "Maximum flow from node %s to node %s is %g\\n\\n", s, t, flow;
            printf "Starting node   Ending node   Arc capacity   Flow in arc\\n";
            printf "-------------   -----------   ------------   -----------\\n";
            printf{(i,j) in E: x[i,j] != 0}: "%13s   %11s   %12g   %11g\\n", i, j,
               a[i,j], x[i,j];
            printf{1..56} "="; printf "\\n";

            end;
        `,
        data: `
            data;

            /* These data correspond to an example from [Christofides]. */

            /* Optimal solution is 29 */

            param n := 9;

            param : E :   a :=
                   1 2   14
                   1 4   23
                   2 3   10
                   2 4    9
                   3 5   12
                   3 8   18
                   4 5   26
                   5 2   11
                   5 6   25
                   5 7    4
                   6 7    7
                   6 8    8
                   7 9   15
                   8 9   20;

            end;
        `
    },
    {
        model: `
            /* SUDOKU, Number Placement Puzzle */

            /* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

            /* Sudoku, also known as Number Place, is a logic-based placement
               puzzle. The aim of the canonical puzzle is to enter a numerical
               digit from 1 through 9 in each cell of a 9x9 grid made up of 3x3
               subgrids (called "regions"), starting with various digits given in
               some cells (the "givens"). Each row, column, and region must contain
               only one instance of each numeral.

                Example:

                +-------+-------+-------+
                | 5 3 . | . 7 . | . . . |
                | 6 . . | 1 9 5 | . . . |
                | . 9 8 | . . . | . 6 . |
                +-------+-------+-------+
                | 8 . . | . 6 . | . . 3 |
                | 4 . . | 8 . 3 | . . 1 |
                | 7 . . | . 2 . | . . 6 |
                +-------+-------+-------+
                | . 6 . | . . . | 2 8 . |
                | . . . | 4 1 9 | . . 5 |
                | . . . | . 8 . | . 7 9 |
                +-------+-------+-------+

                (From Wikipedia, the free encyclopedia.) */

            param givens{1..9, 1..9}, integer, >= 0, <= 9, default 0;
            /* the "givens" */

            var x{i in 1..9, j in 1..9, k in 1..9}, binary;
            /* x[i,j,k] = 1 means cell [i,j] is assigned number k */

            s.t. fa{i in 1..9, j in 1..9, k in 1..9: givens[i,j] != 0}:
                x[i,j,k] = (if givens[i,j] = k then 1 else 0);
            /* assign pre-defined numbers using the "givens" */

            s.t. fb{i in 1..9, j in 1..9}: sum{k in 1..9} x[i,j,k] = 1;
            /* each cell must be assigned exactly one number */

            s.t. fc{i in 1..9, k in 1..9}: sum{j in 1..9} x[i,j,k] = 1;
            /* cells in the same row must be assigned distinct numbers */

            s.t. fd{j in 1..9, k in 1..9}: sum{i in 1..9} x[i,j,k] = 1;
            /* cells in the same column must be assigned distinct numbers */

            s.t. fe{I in 1..9 by 3, J in 1..9 by 3, k in 1..9}:
                sum{i in I..I+2, j in J..J+2} x[i,j,k] = 1;
            /* cells in the same region must be assigned distinct numbers */

            /* there is no need for an objective function here */

            solve;

            for {i in 1..9}
            {  for {0..0: i = 1 or i = 4 or i = 7}
                printf " +-------+-------+-------+\\n";
                for {j in 1..9}
                {  for {0..0: j = 1 or j = 4 or j = 7} printf(" |");
                printf " %d", sum{k in 1..9} x[i,j,k] * k;
                for {0..0: j = 9} printf(" |\\n");
                }
                for {0..0: i = 9}
                printf " +-------+-------+-------+\\n";
            }

            end;
        `,
        data: `
            /* sudoku.dat, a hard Sudoku puzzle which causes branching */
            
            data;
            
            param givens : 1 2 3 4 5 6 7 8 9 :=
                       1   1 . . . . . 7 . .
                       2   . 2 . . . . 5 . .
                       3   6 . . 3 8 . . . .
                       4   . 7 8 . . . . . .
                       5   . . . 6 . 9 . . .
                       6   . . . . . . 1 4 .
                       7   . . . . 2 5 . . 9
                       8   . . 3 . . . . 6 .
                       9   . . 4 . . . . . 2 ;
            
            end;
        `
    },
    {
        model: `
            # Traveling Salesman Problem with Time Windows

            param start symbolic;
            param finish symbolic, != start;
            param maxspeed;

            set PLACES;
            param lat{PLACES};
            param lng{PLACES};
            param S1{PLACES};
            param S2{p in PLACES} >= S1[p];

            # compute great circle distances and minimum travel times
            param d2r := 3.1415926/180;
            param alpha{a in PLACES, b in PLACES} := sin(d2r*(lat[a]-lat[b])/2)**2 
                  + cos(d2r*lat[a])*cos(d2r*lat[b])*sin(d2r*(lng[a]-lng[b])/2)**2;
            param gcdist{a in PLACES, b in PLACES} := 2*6371*atan(sqrt(alpha[a,b]),sqrt(1-alpha[a,b]));

            # Path constraints
            var x{PLACES, PLACES} binary;

            # must leave from all nodes except the finish node
            s.t. lv1 {a in PLACES : a != finish}: sum{b in PLACES} x[a,b] = 1;
            s.t. lv2 : sum{b in PLACES} x[finish,b] = 0;

            # must arrive at all places except the start node
            s.t. ar1 {a in PLACES : a != start}: sum{b in PLACES} x[b,a] = 1;
            s.t. ar2 : sum{b in PLACES} x[b,start] = 0;

            # subtour elimination using an idea from Andrew O. Makhorin
            var y{PLACES, PLACES} >= 0, integer;
            s.t. capbnd {a in PLACES, b in PLACES} : y[a,b] <= (card(PLACES)-1)*x[a,b];
            s.t. capcon {a in PLACES} : sum{b in PLACES} y[b,a] 
                     + (if a=start then card(PLACES)) = 1 + sum{b in PLACES} y[a,b];

            # Time Constraints
            param bigM := 50;
            var tar{PLACES};         # arrival
            var tlv{PLACES};         # departure
            var tea{PLACES} >= 0;    # early arrival (arrival before the designated time window)
            var tla{PLACES} >= 0;    # late arrival (arrival after the designated time window)
            var ted{PLACES} >= 0;    # early departure (departure before the designated time window)
            var tld{PLACES} >= 0;    # late departure (departure after the designated time window)

            s.t. t1 {a in PLACES} : tlv[a] >= tar[a]; 
            s.t. t2 {a in PLACES, b in PLACES} : 
                    tar[b] >= tlv[a] + gcdist[a,b]/maxspeed - bigM*(1-x[a,b]);
            s.t. t3 {a in PLACES : a != start } : tea[a] >= S1[a] - tar[a];   # early arrival
            s.t. t4 {a in PLACES : a != start } : tla[a] >= tar[a] - S2[a];   # late arrival
            s.t. t5 {a in PLACES : a != finish} : ted[a] >= S1[a] - tlv[a];   # early departure
            s.t. t6 {a in PLACES : a != finish} : tld[a] >= tlv[a] - S2[a];   # late departure

            # the objective is weighted sum of average and maximum time window excursions
            var tmax >= 0;
            s.t. o1 {a in PLACES} : tea[a] <= tmax;
            s.t. o2 {a in PLACES} : tla[a] <= tmax;
            s.t. o3 {a in PLACES} : ted[a] <= tmax;
            s.t. o4 {a in PLACES} : tld[a] <= tmax;

            minimize obj: sum{a in PLACES} (1*tea[a] + 2*tla[a] + 2*ted[a] + 1*tld[a]) + 2*tmax;

            solve;

            printf "%6s  %3s   %6s  %3s %6s %6s %6s %6s %7s %5s %6s\\n", 
                'Depart','','Arrive','','EDep','LDep','EArr','LArr','Dist','Time','Speed';

            for {k in card(PLACES)-1..0 by -1} {
                printf {a in PLACES, b in PLACES : (y[a,b]=k) && (x[a,b]=1)}
                    "%-3s %7.2f   %-3s %7.2f %6.2f%1s %5.2f%1s %5.2f%1s %5.2f%1s %6.1f %5.2f %6.1f\\n", 
                    a, tlv[a], b, tar[b], 
                    ted[a], if (ted[a]>0) then '*' else ' ',
                    tld[a], if (tld[a]>0) then '*' else ' ',
                    tea[b], if (tea[b]>0) then '*' else ' ',
                    tla[b], if (tla[b]>0) then '*' else ' ',
                    gcdist[a,b], (tar[b]-tlv[a]), gcdist[a,b]/(tar[b]-tlv[a]);
            }

            end;
        `,
        data: `
            data;

            param start := 'ATL';
            param finish := 'ORD';
            param maxspeed := 800;

            param : PLACES :         lat            lng       S1       S2 :=
                    ATL       33.6366995    -84.4278639      8.0     24.0
                    BOS       42.3629722    -71.0064167      8.0      9.0
                    DEN       39.8616667   -104.6731667     12.0     15.0
                    DFW       32.8968281    -97.0379958     12.0     13.0
                    JFK       40.6397511    -73.7789256     18.0     20.0
                    LAX       33.9424955   -118.4080684     12.0     16.0
                    ORD       41.9816486    -87.9066714     20.0     24.0
                    STL       38.7486972    -90.3700289     11.0     13.0
            ; 

            end;
        `
    },
    {
        model: `
            # Konno and Yamazaki (1990) proposed a linear programming model for
            # portfolio optimization in which the risk measure is mean absolute
            # deviation (MAD). This model computes a portfolio minimizing MAD
            # subject to a lower bound on return.

            # In contrast to the classical Markowitz portfolio, the MAD criterion
            # requires a data set consisting of returns on the investment assets.
            # The data set may be an historical record or samples from a 
            # multivariate statistical model of portfolio returns. The MAD criterion
            # produces portfolios with properties not shared by the Markowitz portfolio,
            # including second degree stochastic dominance.

            # Below we demonstrate portfolio optimization with the MAD criterion
            # where data is generated by sampling a multivariate normal distribution.
            # Given mean return r and the Cholesky decomposition of the covariance matrix 
            # Σ (i.e., C such that CCT=Σ ), we compute rt=r+Czt where the elements
            # of zt are zero mean normal variates with unit variance.

            # The rest of the formulation is adapted from "Optimization Methods
            # in Finance" by Gerald Curnuejols and Reha Tutuncu (2007) which, in
            # turn, follows an implementation due to Fienstein and Thapa (1993).
            # A complete tutorial on the implementation of this model is available
            # on GLPK wikibook. A complete tutorial describing the implementation of
            # this model is available on GLPK wikibook.
            # http://en.wikibooks.org/wiki/GLPK/Portfolio_Optimization

            # Example: PortfolioMAD.mod  Portfolio Optimization using Mean Absolute Deviation

            /* Stock Data */

            set S;                                    # Set of stocks
            param r{S};                               # Means of projected returns
            param cov{S,S};                           # Covariance of projected returns
            param r_portfolio
                default (1/card(S))*sum{i in S} r[i]; # Lower bound on portfolio return

            /* Generate sample data */

            /* Cholesky Lower Triangular Decomposition of the Covariance Matrix */
            param c{i in S, j in S : i >= j} := 
                if i = j then
                    sqrt(cov[i,i]-(sum {k in S : k < i} (c[i,k]*c[i,k])))
                else
                    (cov[i,j]-sum{k in S : k < j} c[i,k]*c[j,k])/c[j,j];

            /* Because there is no way to seed the PRNG, a workaround */
            param utc := prod {1..2} (gmtime()-1000000000);
            param seed := utc - 100000*floor(utc/100000);
            check sum{1..seed} Uniform01() > 0;

            /* Normal random variates */
            param N default 5000;
            set T := 1..N;
            param zn{j in S, t in T} := Normal(0,1);
            param rt{i in S, t in T} := r[i] + sum {j in S : j <= i} c[i,j]*zn[j,t];

            /* MAD Optimization */

            var w{S} >= 0;                # Portfolio Weights with Bounds
            var y{T} >= 0;                # Positive deviations (non-negative)
            var z{T} >= 0;                # Negative deviations (non-negative)

            minimize MAD: (1/card(T))*sum {t in T} (y[t] + z[t]);

            s.t. C1: sum {s in S} w[s]*r[s] >= r_portfolio;
            s.t. C2: sum {s in S} w[s] = 1;
            s.t. C3 {t in T}: (y[t] - z[t]) = sum{s in S} (rt[s,t]-r[s])*w[s];

            solve;

            /* Report */

            /* Input Data */
            printf "Stock Data\\n\\n";
            printf "         Return   Variance\\n";
            printf {i in S} "%5s   %7.4f   %7.4f\\n", i, r[i], cov[i,i];

            printf "\\nCovariance Matrix\\n\\n";
            printf "     ";
            printf {j in S} " %7s ", j;
            printf "\\n";
            for {i in S} {
                printf "%5s  " ,i;
                printf {j in S} " %7.4f ", cov[i,j];
                printf "\\n";
            }

            /* MAD Optimal Portfolio */
            printf "\\nMinimum Absolute Deviation (MAD) Portfolio\\n\\n";
            printf "  Return   = %7.4f\\n",r_portfolio;
            printf "  Variance = %7.4f\\n\\n", sum {i in S, j in S} w[i]*w[j]*cov[i,j];
            printf "         Weight\\n";
            printf {s in S} "%5s   %7.4f\\n", s, w[s];
            printf "\\n";

            /* Simulated Return data in Matlab Format */
            /*
            printf "\\nrt = [ ... \\n";
            for {t in T} {
               printf {s in S} "%9.4f",rt[s,t];
               printf "; ...\\n";
            }
            printf "];\\n\\n";
            */

            end;
        `,
        data: `
            data;

            /* Data for monthly returns on four selected stocks for a three
            year period ending December 4, 2009 */

            param N := 200;

            param r_portfolio := 0.01;

            param : S : r :=
                AAPL    0.0308
                GE     -0.0120
                GS      0.0027
                XOM     0.0018 ;

            param   cov : 
                        AAPL    GE      GS      XOM  :=
                AAPL    0.0158  0.0062  0.0088  0.0022
                GE      0.0062  0.0136  0.0064  0.0011
                GS      0.0088  0.0064  0.0135  0.0008
                XOM     0.0022  0.0011  0.0008  0.0022 ;

            end;
        `
    },
    {
        model: `
            /* Example: JobShop.mod */

            /*
            A simple job shop consists of a set of different machines that process jobs. Each job
            consists of series of tasks that must be completed in specified order on the machines.
            The problem is to schedule the jobs on the machines to minimize makespan.

            Data consists of two tables. The first table is decomposition of the jobs into a series
            of tasks. Each task lists a job name, name of the required machine, and task duration.
            The second table list task pairs where the first task must be completed before the
            second task can be started. This formulation is quite general, but can also specify
            situations with no feasible solutions.
            */

            /* Data Table 1. Tasks consist of Job, Machine, Dur data*/
            set TASKS dimen 2;
            param dur{TASKS};

            /* Data Table 2 */
            set TASKORDER within {TASKS,TASKS};

            /* JOBS and MACHINES are inferred from the data tables*/
            set JOBS := setof {(j,m) in TASKS} j;
            set MACHINES := setof {(j,m) in TASKS} m;

            /* Decision variables are start times for tasks, and the makespan */
            var start{TASKS} >= 0;
            var makespan >= 0;

            /* BigM is set to be bigger than largest possible makespan */
            param BigM := 1 + sum {(j,m) in TASKS} dur[j,m];

            /* The primary objective is to minimize makespan, with a secondary
            objective of starting tasks as early as possible */
            minimize OBJ: BigM*makespan + sum{(j,m) in TASKS} start[j,m];

            /* By definition, all jobs must be completed within the makespan */
            s.t. A {(j,m) in TASKS}: start[j,m] + dur[j,m] <= makespan;

            /* Must satisfy any orderings that were given for the tasks. */
            s.t. B {(k,n,j,m) in TASKORDER}: start[k,n] + dur[k,n] <= start[j,m];

            /* Eliminate conflicts if tasks are require the same machine */
            /* y[i,m,j] = 1 if Job i is scheduled before job j on machine m*/
            var y{(i,m) in TASKS,(j,m) in TASKS: i < j} binary;
            s.t. C {(i,m) in TASKS,(j,m) in TASKS: i < j}:
               start[i,m] + dur[i,m] <= start[j,m] + BigM*(1-y[i,m,j]);
            s.t. D {(i,m) in TASKS,(j,m) in TASKS: i < j}:
               start[j,m] + dur[j,m] <= start[i,m] + BigM*y[i,m,j];

            solve;

            printf "Makespan = %5.2f\\n",makespan;

            /* Post solution, compute finish times for each task to use in report */
            param finish{(j,m) in TASKS} := start[j,m] + dur[j,m];

            /* Task Summary Report */
            printf "\\n                TASK SUMMARY\\n";
            printf "\\n     JOB   MACHINE     Dur   Start  Finish\\n";
            printf {(i,m) in TASKS} "%8s  %8s   %5.2f   %5.2f   %5.2f\\n", 
               i, m, dur[i,m], start[i,m], finish[i,m];

            /* Schedule of activities for each job */
            set M{j in JOBS} := setof {(j,m) in TASKS} m;
            param r{j in JOBS, m in M[j]} := 
               1+sum{n in M[j]: start[j,n] < start[j,m] || start[j,n]==start[j,m] && n < m} 1;
            printf "\\n\\n           JOB SCHEDULES\\n";
            for {j in JOBS} {
               printf "\\n%s:\\n",j;
               printf "         MACHINE   Start   Finish\\n";
               printf {k in 1..card(M[j]), m in M[j]: k==r[j,m]} 
                  " %15s   %5.2f    %5.2f\\n",m, start[j,m],finish[j,m];
            }

            /* Schedule of activities for each machine */
            set J{m in MACHINES} := setof {(j,m) in TASKS} j;
            param s{m in MACHINES, j in J[m]} := 
               1+sum{k in J[m]: start[k,m] < start[j,m] || start[k,m]==start[j,m] && k < j} 1;
            printf "\\n\\n         MACHINE SCHEDULES\\n";
            for {m in MACHINES} {
               printf "\\n%s:\\n",m;
               printf "             JOB   Start   Finish\\n";
               printf {k in 1..card(J[m]), j in J[m]: k==s[m,j]} 
                  " %15s   %5.2f    %5.2f\\n",j, start[j,m],finish[j,m];
            }

            end;
        `,
        data: `
            data;

            /* Job shop data from Christelle Gueret, Christian Prins,  Marc Sevaux,
            "Applications of Optimization with Xpress-MP," Chapter 5, Dash Optimization, 2000. */

            /* Jobs are broken down into a list of tasks (j,m), each task described by
            job name j, machine name m, and duration dur[j,m] */

            param: TASKS: dur :=
               Paper_1  Blue    45
               Paper_1  Yellow  10
               Paper_2  Blue    20
               Paper_2  Green   10
               Paper_2  Yellow  34
               Paper_3  Blue    12
               Paper_3  Green   17
               Paper_3  Yellow  28 ;

            /* List task orderings (k,n,j,m) where task (k,n) must proceed task (j,n) */

            set TASKORDER :=
               Paper_1 Blue    Paper_1 Yellow
               Paper_2 Green   Paper_2 Blue
               Paper_2 Blue    Paper_2 Yellow
               Paper_3 Yellow  Paper_3 Blue
               Paper_3 Blue    Paper_3 Green ;

            end;
        `
    },
    {
        model: `
            # Example: ProjectCPM.mod

            /*
            The Critical Path Method is a technique for calculating the shortest time span needed to
            complete a series of tasks. The tasks are represented by nodes, each labelled with the
            duration. The precedence order of the task is given by a set of arcs.

            Here we demonstrate the representation and calculation of the critical path.
            Decision variables are introduced for

             - Earliest Start
             - Earliest Finish
             - Latest Start
             - Latest Finish
             - Slack = Earliest Finish - Earliest Start = Latest Finish - Earliest Finish

            Tasks on the Critical Path have zero slack.
            */

            set TASKS;
            set ARCS within {TASKS cross TASKS};

            /* Parameters are the durations for each task */
            param dur{TASKS} >= 0;

            /* Decision Variables associated with each task*/
            var Tes{TASKS} >= 0;     # Earliest Start
            var Tef{TASKS} >= 0;     # Earliest Finish
            var Tls{TASKS} >= 0;     # Latest Start
            var Tlf{TASKS} >= 0;     # Latest Finish
            var Tsl{TASKS} >= 0;     # Slacks

            /* Global finish time */
            var Tf >= 0;

            /* Minimize the global finish time and, secondarily, maximize slacks */
            minimize ProjectFinish : card(TASKS)*Tf - sum {j in TASKS} Tsl[j];

            /* Finish is the least upper bound on the finish time for all tasks */
            s.t. Efnsh {j in TASKS} : Tef[j] <= Tf;
            s.t. Lfnsh {j in TASKS} : Tlf[j] <= Tf;

            /* Relationship between start and finish times for each task */
            s.t. Estrt {j in TASKS} : Tef[j] = Tes[j] + dur[j];
            s.t. Lstrt {j in TASKS} : Tlf[j] = Tls[j] + dur[j];

            /* Slacks */
            s.t. Slack {j in TASKS} : Tsl[j] = Tls[j] - Tes[j];

            /* Task ordering */
            s.t. Eordr {(i,j) in ARCS} : Tef[i] <= Tes[j];
            s.t. Lordr {(j,k) in ARCS} : Tlf[j] <= Tls[k];

            /* Compute Solution  */
            solve;

            /* Print Report */
            printf 'PROJECT LENGTH = %8g\\n',Tf;

            /* Critical Tasks are those with zero slack */

            /* Rank-order tasks on the critical path by earliest start time */
            param r{j in TASKS : Tsl[j] = 0} := sum{k in TASKS : Tsl[k] = 0}
               if (Tes[k] <= Tes[j]) then 1;

            printf '\\nCRITICAL PATH\\n';
            printf '    TASK    DUR     Start    Finish\\n';
            printf {k in 1..card(TASKS), j in TASKS : Tsl[j]=0 && k==r[j]}
               '%8s %6g  %8g  %8g\\n', j, dur[j], Tes[j], Tef[j];

            /* Noncritical Tasks have positive slack */

            /* Rank-order tasks not on the critical path by earliest start time */
            param s{j in TASKS : Tsl[j] > 0} := sum{k in TASKS : Tsl[k] = 0}
               if (Tes[k] <= Tes[j]) then 1;

            printf '\\nNON-CRITICAL TASKS\\n';
            printf '                 Earliest  Earliest    Latest    Latest \\n';
            printf '    TASK    DUR     Start    Finish     Start    Finish     Slack\\n';
            printf {k in 1..card(TASKS), j in TASKS : Tsl[j] > 0 && k==s[j]}
               '%8s %6g  %8g  %8g  %8g  %8g  %8g\\n', 
               j,dur[j],Tes[j],Tef[j],Tls[j],Tlf[j],Tsl[j];
            printf '\\n';

            end;
        `,
        data: `
            data;

            /* Stadium Construction Example from Christelle Gueret, Christian Prins, 
            Marc Sevaux, "Applications of Optimization with Xpress-MP," Chapter 5,
            Dash Optimization, 2000. */ 

            param : TASKS : dur :=
               T01   2.0
               T02  16.0
               T03   9.0
               T04   8.0
               T05  10.0
               T06   6.0
               T07   2.0
               T08   2.0
               T09   9.0
               T10   5.0
               T11   3.0
               T12   2.0
               T13   1.0
               T14   7.0
               T15   4.0
               T16   3.0
               T17   9.0
               T18   1.0 ;

            set ARCS := 
               T01  T02
               T02  T03
               T02  T04
               T02  T14
               T03  T05
               T04  T07
               T04  T10
               T04  T09
               T04  T06
               T04  T15
               T05  T06
               T06  T09
               T06  T11
               T06  T08
               T07  T13
               T08  T16
               T09  T12
               T11  T16
               T12  T17
               T14  T16
               T14  T15
               T17  T18 ;

            end;
        `
    },
    {
        model: `
            /* Machine Bottleneck Example */

            /*

            The task is to schedule a set of jobs on a single machine given the release time, duration,
            and due time for each job.
            */

            set JOBS;

            param rel{JOBS} default 0;   # Time a job is available to the machine
            param dur{JOBS};             # Job duration
            param due{JOBS};             # Job due time

            /* Data Checks */
            check {k in JOBS}: rel[k] + dur[k] <= due[k];

            /* The model uses a 'Big M' implementation of disjunctive constraints
            to avoid conflicts for a single machine.  Big M should be larger than
            the longest time horizon for the completion of all jobs. A bound
            on the longest horizon is the maximum release plus the sum of
            durations for all jobs. */

            param BigM := (max {k in JOBS} rel[k] ) + sum{k in JOBS} dur[k];

            /* Decision variables are the start times for each job, and a
            disjunctive variable y[j,k] which is 1 if job j precedes job k on
            the machine. */

            var start{JOBS} >= 0;
            var pastdue{JOBS} >= 0;
            var y{JOBS,JOBS} binary;

            /* There are many possible objectives, including total pastdue, maximum
            pastdue (i.e., tardiness), number of jobs pastdue.  */

            minimize OBJ : sum {k in JOBS} pastdue[k];

            /* Order Constraints */

            s.t. START {k in JOBS}: start[k] >= rel[k];
            s.t. FINIS {k in JOBS}: start[k] + dur[k] <= due[k] + pastdue[k];

            /* Machine Conflict Constraints */

            s.t. DA {j in JOBS, k in JOBS : j < k}:
               start[j] + dur[j] <= start[k] + BigM*(1-y[j,k]);
            s.t. DB {j in JOBS, k in JOBS : j < k}:
               start[k] + dur[k] <= start[j] + BigM*y[j,k];

            solve;

            /* Print Report */

            printf " Task     Rel     Dur     Due   Start  Finish Pastdue\\n";
            printf {k in JOBS} "%5s %7g %7g %7g %7g %7g %7g\\n",
               k,rel[k],dur[k],due[k],start[k],start[k]+dur[k],pastdue[k];

            end;
        `,
        data: `
            data;

            /* Machine Bottleneck Example from Christelle Gueret, Christian Prins,
            Marc Sevaux, "Applications of Optimization with Xpress-MP," Chapter 5,
            Dash Optimization, 2000. */

            param: JOBS : rel   dur   due :=
                     A      2     5    10
                     B      5     6    21
                     C      4     8    15
                     D      0     4    10
                     E      0     2     5
                     F      8     3    15
                     G      9     2    22 ;

            end;
        `
    },
    {
        model: `
            # Example: Newsvendor.mod

            /*
            The newsvendor problem is a two stage decision problem with recourse. The vendor needs to
            decide how much inventory to order today to fulfill an uncertain demand. The data includes
            the unit cost, price, and salvage value of the product being sold, and a probabilistic
            forecast of demand. The objective is to maximize expected profit.

            As shown in lecture, this problem can be solved with a plot, and the solution interpreted in
            terms of a cumulative probability distribution. The advantage of a MathProg model is that
            additional constraints or other criteria may be considered, such as risk aversion.

            There is an extensive literature on the newsvendor problem which has been studied since at
            least 1888. See here for a thorough discussion.
            */

            /* Unit Price Data */
            param r >= 0;                              # Price
            param c >= 0;                              # Cost
            param w >= 0;                              # Salvage value

            /* Price data makes sense only if  Price > Cost > Salvage */
            check: c <= r;
            check: w <= c;

            /* Probabilistic Demand Forecast */
            set SCENS;                                 # Scenarios
            param D{SCENS} >= 0;                       # Demand
            param Pr{SCENS} >= 0;                      # Probability

            /* Probabilities must sum to one. */
            check: sum{k in SCENS} Pr[k] = 1;

            /* Expected Demand */
            param ExD := sum{k in SCENS} Pr[k]*D[k];

            /* Lower Bound on Profit: Expected Value of the Mean Solution */
            param EVM := -c*ExD + sum{k in SCENS} Pr[k]*(r*min(ExD,D[k])+w*max(ExD-D[k],0));

            /* Upper Bound on Profit: Expected Value with Perfect Information */
            param EVPI := sum{k in SCENS} Pr[k]*(r-c)*D[k];

            /* Two Stage Stochastic Programming */
            var x >= 0;                     # Stage 1 (Here and Now): Order Quqntity
            var y{SCENS}>= 0;               # Stage 2 (Scenario Dep): Actual Sales
            var ExProfit;                   # Expected Profit

            /* Maximize Expected Profit */
            maximize OBJ: ExProfit;

            /* Goods sold are limited by the order quantities and the demand  */
            s.t. PRFT: ExProfit = -c*x + sum{k in SCENS} Pr[k]*(r*y[k] + w*(x-y[k]));
            s.t. SUPL {k in SCENS}: y[k] <= x;
            s.t. DMND {k in SCENS}: y[k] <= D[k];

            solve; 

            printf "EXPECTED VALUE OF THE MEAN SOLUTION\\n" >> "EVM";
            printf "\\nSCENARIO     PROB   DEMAND    ORDER     SOLD  SALVAGE   PROFIT\\n" >> "EVM";
            printf {k in SCENS} "%s     %7.2f  %7.2f  %7.2f  %7.2f  %7.2f  %7.2f\\n",
               k, Pr[k], D[k], ExD, min(ExD,D[k]), max(ExD-D[k],0), 
               -c*ExD + r*min(ExD,D[k]) + w*max(ExD-D[k],0) >> "EVM";
            printf "\\n%s               %7.2f  %7.2f  %7.2f  %7.2f  %7.2f\\n",
               'MEAN', ExD, ExD, sum{k in SCENS}Pr[k]*min(ExD,D[k]),
               sum{k in SCENS}Pr[k]*max(ExD-D[k],0),EVM >> "EVM";

            printf "EXPECTED VALUE WITH PERFECT INFORMATION\\n" >> "EVPI";
            printf "\\nSCENARIO     PROB   DEMAND    ORDER     SOLD  SALVAGE   PROFIT\\n" >> "EVPI";
            printf {k in SCENS} "%s     %7.2f  %7.2f  %7.2f  %7.2f  %7.2f  %7.2f\\n",
               k, Pr[k], D[k], D[k], D[k], 0, -c*D[k] + r*D[k] >> "EVPI";
            printf "\\n%s               %7.2f  %7.2f  %7.2f  %7.2f  %7.2f\\n",
               'MEAN', ExD, ExD, ExD,0,EVPI >> "EVPI";

            printf "TWO STAGE STOCHASTIC PROGRAMMING\\n\\n" >> "SP";
            printf " Order Quantity = %g\\n", x >> "SP";
            printf "Expected Profit = %g\\n", ExProfit >> "SP";
            printf "\\nSCENARIO     PROB   DEMAND    ORDER     SOLD  SALVAGE   PROFIT\\n" >> "SP";
            printf {k in SCENS} "%s     %7.2f  %7.2f  %7.2f  %7.2f  %7.2f  %7.2f\\n",
               k, Pr[k], D[k], x, y[k], x-y[k], -c*x + r*y[k] + w*(x-y[k]) >> "SP";
            printf "\\n%s               %7.2f  %7.2f  %7.2f  %7.2f  %7.2f\\n",
               'MEAN', ExD, x, sum{k in SCENS}Pr[k]*y[k],
               sum{k in SCENS}Pr[k]*(x-y[k]),ExProfit >> "SP";

            printf "    VALUE OF PERFECT INFORMATION = %7.2f\\n",EVPI-ExProfit >> "Summary";
            printf "VALUE OF THE STOCHASTIC SOLUTION = %7.2f\\n",ExProfit - EVM >> "Summary"; 

            end;
        `,
        data: `
            data;

            /* Problem Data corresponds to a hypothetical case of selling programs prior 
            to a home football game. */

            param r := 10.00;                         # Unit Price
            param c :=  6.00;                         # Unit Cost
            param w :=  2.00;                         # Unit Salvage Value

            param: SCENS:  Pr    D   :=
                   HiDmd   0.25  250
                   MiDmd   0.50  125
                   LoDmd   0.25   75 ;

            end;
        `
    },
    // {
    //     model: `
    //     `,
    //     data: `
    //     `
    // },
    // {
    //     model: `
    //     `,
    //     data: `
    //     `
    // },
].map(x => ({
    model: trimExcess(x.model),
    data: trimExcess(x.data),
}));