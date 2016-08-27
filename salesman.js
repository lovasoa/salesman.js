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
 **/
Path.find = function(points, temp_coeff, callback) {
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
 */
Path.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

function distance(p, q) {
  var dx = p.x - q.x, dy = p.y - q.y;
  return Math.sqrt(dx*dx + dy*dy);
}

module.exports = Path;

////////////////
function cb(){
  this.start = this.start || Date.now();
  this.x = this.x | 0;
  this.x ++;
  if(this.x % 1e6 == 0)
    console.log("ops/s: %d", 1000 * this.x / (Date.now() - this.start));
}

for(var a=[]; a.length < 1e6; a.push({x:Math.random(), y:Math.random()}));
var res = Path.find(a, 0.99999, cb);
