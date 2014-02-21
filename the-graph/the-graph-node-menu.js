(function (context) {
  "use strict";

  var TheGraph = context.TheGraph;


  TheGraph.NodeMenu = React.createClass({
    radius: 72,
    stopPropagation: function (event) {
      // Don't drag graph
      event.stopPropagation();
    },
    componentDidMount: function () {
      // Prevent context menu
      this.getDOMNode().addEventListener("contextmenu", function (event) {
        event.stopPropagation();
        event.preventDefault();
      }, false);
    },
    render: function() {
      var scale = this.props.node.props.app.state.scale;
      var ports = this.props.ports;
      var deltaX = this.props.deltaX;
      var deltaY = this.props.deltaY;

      var children = [
        TheGraph.NodeMenuPorts({
          ports: ports.inports,
          isIn: true,
          scale: scale,
          processKey: this.props.processKey,
          deltaX: deltaX,
          deltaY: deltaY
        }),
        TheGraph.NodeMenuPorts({
          ports: ports.outports,
          isIn: false,
          scale: scale,
          processKey: this.props.processKey,
          deltaX: deltaX,
          deltaY: deltaY
        }),
        TheGraph.Menu({
          x: 0,
          y: 0,
          graph: this.props.graph,
          itemKey: this.props.processKey,
          item: this.props.process,
          menu: this.props.menu,
          icon: this.props.icon,
          label: this.props.label
        })
      ];

      return (
        React.DOM.g(
          {
            className: "context-node",
            transform: "translate("+this.props.x+","+this.props.y+")",
            children: children
          }
        )
      );
    }
  });


})(this);
