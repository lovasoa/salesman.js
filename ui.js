var Canvas = React.createClass({
  getInitialState: function() {
    return {
      width: 800,
      height: 600,
      points: [],
      order: []
    };
  },
  componentDidMount: function() {
    this.worker = new Worker("webworker.js");
    this.worker.onmessage = e => {
      this.setState({order: e.data});
    };

    var pts = new Array(30);
    for(var i=0; i<pts.length; i++) pts[i] = {
      id: this.generateId(),
      x : Math.random()*this.state.width,
      y : Math.random()*this.state.height
    };
    this.setPoints(pts);
  },
  componentWillUnmount: function() {
    this.worker.terminate();
  },
  generateId: function(){
    return Math.random().toString(36).slice(2);
  },
  setPoints : function(pts) {
    this.setState({points:pts, order:[]});
    this.worker.postMessage(pts);
  },
  removePoint: function(p) {
    this.setPoints(
      this.state.points.filter(pp => pp.id !== p.id)
    )
  },
  drawPoint : function(p) {
      return <circle
        key={p.id}
        cx={p.x} cy={p.y} r="5"
        onClick={(e) => {
                          e.stopPropagation();
                          this.removePoint(p);
                        }}
      />
  },
  addPoint : function(e) {
    this.setPoints(
      this.state.points.concat([{
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          id: this.generateId()
      }])
    );
  },
  render: function() {
    return (
      <svg
        onClick={this.addPoint}
        className="graph"
        width={this.state.width} height={this.state.height}>
        
        <PathElem points={this.state.points} order={this.state.order} />
        <g className="points">
          {this.state.points.map(this.drawPoint)}
        </g>
      </svg>
    );
  }
});

var PathElem = React.createClass({
  get: function(k) {
    const {points, order} = this.props;
    return points[order[k % order.length]];
  },
  draw: function(p, q) {
    return <line key={p.id+q.id} x1={p.x} x2={q.x} y1={p.y} y2={q.y} />
  },
  render : function() {
    return (
      <g className="path">
        {this.props.order.map((_,n) => this.draw(this.get(n), this.get(n+1)))}
      </g>
    );
  }
});

ReactDOM.render(
  <Canvas/>,
  document.getElementById('main')
);

