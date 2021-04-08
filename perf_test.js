const {
  performance,
  PerformanceObserver
} = require('perf_hooks');
const salesman = require("./salesman.js");

const width = 100;
const height = 100;
const size = 5000;
const perfTestCount = 500;

function createPoint(id) {
  return {id, x: width * Math.random(), y: height * Math.random()};
}

const durations = [];

function arraySum(arr) {
  return arr.reduce((a,b) => a + b, 0);
}

function arrayAvg(arr) {
  return arraySum(arr) / arr.length;
}

for (let i = 1; i <= perfTestCount; i++) {
  console.log(`Running test ${i}`);

  const testPoints = [...Array(size).keys()].map((index) => (createPoint(index)));

  const startTime = performance.now();
  const result = salesman.solve(testPoints);
  const duration = (performance.now() - startTime) / 1000; // Milliseconds
  durations.push(duration);
  console.log(`Test ${i} done, took ${duration}`);
}

console.log('RESULTS');
console.log('-------');
console.log(`* Average Time: ${arrayAvg(durations)}`);
console.log(`* Max Time: ${Math.max(...durations)}`);
console.log(`* Min Time: ${Math.min(...durations)}`);