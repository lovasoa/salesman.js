var assert = require("assert");
var salesman = require("./salesman.js");

var tests = [
    {q:[[0,0]], r:[0]},
    {q:[[0,0],[1,1]], r:[0,1]},
];


for(let test of tests) {
    var points = test.q.map(([x,y])=>new salesman.Point(x,y));
    var res = salesman.solve(points);
    assert.deepEqual(test.r, res);
}
