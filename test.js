const assert = require("assert");
const salesman = require("./salesman.js");

const tests = [
    {q:[[0,0]], r:[0]},
    {q:[[0,0],[1,1]], r:[0,1]},
];


for(let test of tests) {
    const points = test.q.map(([x,y])=>new salesman.Point(x,y));
    const res = salesman.solve(points);
    assert.deepStrictEqual(test.r, res);
}
console.log('Test finalized successfully');
