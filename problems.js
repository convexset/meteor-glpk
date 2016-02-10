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
    // }
].map(x => ({
    model: trimExcess(x.model),
    data: trimExcess(x.data),
}));