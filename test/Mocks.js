function getMockLayerFactory(props) {
  props = props || {};
  var factory = {
    layer : getMockLayer(props),
    getLayer : function() {return this.layer;}
  };

  return factory;
}

function getMockLayer(props) {
  props = props || {};
  var layer = {
    getWidth : function() {return 0;},
    getHeight : function() {return 0;},
    getScreenContext : function() {return props.screenContext || null;},
    getCanvas : function() {return null;},
    getCanvasContext : function() {return null;},
    update : function() {},
    render : function() {},
    handleMouseEvent : function() {},
    clearLayer : function() {}
  };

  return layer;
}
