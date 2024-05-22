var assert = require("assert");
var salesman = require("./salesman.js");

var tests = [
    {q:[[0,0]], r:[0]},
    {q:[[0,0],[1,1]], r:[0,1]},
    {q:[[0,0],[2,2],[1,1]], r:[0,1,2], e: true},
];


for(let test of tests) {
    var points = test.q.map(([x,y])=>new salesman.Point(x,y));
    var res = salesman.solve(points, undefined, undefined, undefined, test.e);
    assert.deepEqual(test.r, res);
}
