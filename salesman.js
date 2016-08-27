/**
 * @module
 * @author Ophir LOJKINE
 * salesman npm module
 **/


/**
 * @private
 */
function Path(points) {
  this.points = points;
  this.order = new Array(points.length);
  for(var i=0; i<points.length; i++) this.order[i] = i;
}
Path.prototype.change = function(temp) {
  var i = this.randomPos(), j = this.randomPos();
  var delta = this.delta_distance(i, j);
  if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
    var tmp = this.order[i];
    this.order[i] = this.order[j];
    this.order[j] = tmp;
  }
};
Path.prototype.delta_distance = function(i, j) {
  return (
       distance(this.access(j-1), this.access(i  ))
     + distance(this.access(i  ), this.access(j+1))
     + distance(this.access(i-1), this.access(j  ))
     + distance(this.access(j  ), this.access(i+1))
     - distance(this.access(j-1), this.access(j  ))
     - distance(this.access(j  ), this.access(j+1))
     - distance(this.access(i-1), this.access(i  ))
     - distance(this.access(i  ), this.access(i+1))
  );
};
Path.prototype.access = function(i) {
  i = (i + this.points.length) % this.points.length;
  return this.points[this.order[i]];
};
Path.prototype.randomPos = function() {
  return Math.floor(Math.random() * this.points.length);
};

/**
 * Solves the following problem:
 *  Given a list of points and the distances between each pair of points,
 *  what is the shortest possible route that visits each point exactly
 *  once and returns to the origin point?
 *
 * @param {Point[]} points The points that the path will have to visit.
 * @param {Number} [temp_coeff=0.999] changes the convergence speed of the algorithm: the closer to 1, the slower the algorithm and the better the solutions.
 * @param {Function} [callback=] An optional callback to be called after each iteration.
 *
 * @returns {Number[]} An array of indexes in the original array. Indicates in which order the different points are visited.
 *
 * @example
 * var points = [
 *       new salesman.Point(2,3)
 *       //other points
 *     ];
 * var solution = salesman.solve(points);
 * var ordered_points = solution.map(i => points[i]);
 * // ordered_points now contains the points, in the order they ought to be visited.
 **/
function solve(points, temp_coeff, callback) {
  var path = new Path(points);
  if (!temp_coeff)
    temp_coeff = 1 - Math.exp(-7 - Math.min(points.length,1e6)/1e5);
  var has_callback = typeof(callback) === "function";

  for (var temperature = 100 * distance(path.access(0), path.access(1));
           temperature > 1e-3;
           temperature *= temp_coeff) {
    path.change(temperature);
    if (has_callback) callback(path.order);
  }
  return path.order;
};

/**
 * Represents a point in two dimensions.
 * @class
 * @param {Number} x abscissa
 * @param {Number} y ordinate
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
};

function distance(p, q) {
  var dx = p.x - q.x, dy = p.y - q.y;
  return Math.sqrt(dx*dx + dy*dy);
}

module.exports = {
  "solve": solve,
  "Point": Point
};
