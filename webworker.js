importScripts('salesman.js');

onmessage = function(e) {
  var points = e.data;
  var i = 0;
  postMessage(
    solve(points, 1-1e-6, o => (i++)%500000 === 0 && postMessage(o))
  );
}
