<a name="module_salesman"></a>

## salesman
**See**: [demo](https://lovasoa.github.io/salesman.js/)  
**Author:** Ophir LOJKINE
salesman npm module

Good heuristic for the traveling salesman problem using simulated annealing.  

* [salesman](#module_salesman)
    * [~Point](#module_salesman..Point)
        * [new Point(x, y)](#new_module_salesman..Point_new)
    * [~solve(points, [temp_coeff], [callback=])](#module_salesman..solve) ⇒ <code>Array.&lt;Number&gt;</code>

<a name="module_salesman..Point"></a>

### salesman~Point
**Kind**: inner class of <code>[salesman](#module_salesman)</code>  
<a name="new_module_salesman..Point_new"></a>

#### new Point(x, y)
Represents a point in two dimensions.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | abscissa |
| y | <code>Number</code> | ordinate |

<a name="module_salesman..solve"></a>

### salesman~solve(points, [temp_coeff], [callback=]) ⇒ <code>Array.&lt;Number&gt;</code>
Solves the following problem:
 Given a list of points and the distances between each pair of points,
 what is the shortest possible route that visits each point exactly
 once and returns to the origin point?

**Kind**: inner method of <code>[salesman](#module_salesman)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of indexes in the original array. Indicates in which order the different points are visited.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| points | <code>Array.&lt;Point&gt;</code> |  | The points that the path will have to visit. |
| [temp_coeff] | <code>Number</code> | <code>0.999</code> | changes the convergence speed of the algorithm: the closer to 1, the slower the algorithm and the better the solutions. |
| [callback=] | <code>function</code> |  | An optional callback to be called after each iteration. |

**Example**  
```js
var points = [
      new salesman.Point(2,3)
      //other points
    ];
var solution = salesman.solve(points);
var ordered_points = solution.map(i => points[i]);
// ordered_points now contains the points, in the order they ought to be visited.
```
