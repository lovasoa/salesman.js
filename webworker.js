importScripts('salesman.js');

onmessage = function(e) {
  var points = e.data;
  var i = 0;
  postMessage(
    solve(points, 1-5e-7, o => (i++)%1e6 === 0 && postMessage(o))
  );
}
