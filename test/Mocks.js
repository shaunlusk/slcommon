var shaunlusk = shaunlusk || {};
shaunlusk.Mocks = {};

shaunlusk.Mocks.getMockLayerFactory = function(props) {
  props = props || {};
  var factory = {
    layer : shaunlusk.Mocks.getMockLayer(props),
    getLayer : function() {return this.layer;}
  };

  return factory;
};

shaunlusk.Mocks.getMockLayer = function(props) {
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
};

shaunlusk.Mocks.getMockGfxElement = function(props) {
  props = props || {};
  var element = {};
  element.id = props.id || 1;
  element.getId = function() {return this.id;};
  element.dirty = props.dirty || false;
  element.setDirty = function(boolean) {this.dirty = boolean;};
  element.isDirty = function() {return this.dirty;};
  element.hidden = props.hidden || false;
  element.isHidden = function() {return this.hidden;};
  element.setHidden = function(val) {this.hidden = val;};
  element.getZIndexComparable = function() {
    return {
      getElement : function() {return element;},
      getKey : function() {return 0;}
    };
  };
  element.collidesWith = function() {return false;};
  element.collidesWithX = function() {return false;};
  element.collidesWithY = function() {return false;};
  element.setHasCollision = function(val) {this.collision = val;};
  element.collision = props.collision || false;
  element.hasCollision = function() {return this.collision;};
  element.clear = function() {};
  element.render = function() {};
  element.x = props.x || 0;
  element.y = props.y || 0;
  element.getX = function() {return this.x;};
  element.getY = function() {return this.y;};
  element.setX = function(x) {this.x = x;};
  element.setY = function(y) {this.y = y;};
  element.zIndex = props.zIndex || -1;
  element.getZIndex = function() {return this.zIndex;};
  element.setZIndex = function(zidx) {this.zIndex = zidx;};
  element.collidesWithCoordinates = function(x,y) {return false;};

  return element;
};
