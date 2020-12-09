const {
  performance,
  PerformanceObserver
} = require('perf_hooks');
var salesman = require("./salesman.js");

var width = 100;
var height = 100;
var size = 5000;
var perfTestCount = 500;

function createPoint(id) {
  return {id, x: width * Math.random(), y: height * Math.random()};
}

var durations = [];

function arraySum(arr) {
  return arr.reduce((a,b) => a + b, 0);
}

function arrayAvg(arr) {
  return arraySum(arr) / arr.length;
}

for (var i = 1; i <= perfTestCount; i++) {
  console.log(`Running test ${i}`);

  var testPoints = [...Array(size).keys()].map((index) => (createPoint(index)));

  var startTime = performance.now();
  var result = salesman.solve(testPoints);
  var duration = (performance.now() - startTime) / 1000; // Milliseconds
  durations.push(duration);
  console.log(`Test ${i} done, took ${duration}`);
}

console.log('RESULTS');
console.log('-------');
console.log(`* Average Time: ${arrayAvg(durations)}`);
console.log(`* Max Time: ${Math.max(...durations)}`);
console.log(`* Min Time: ${Math.min(...durations)}`);