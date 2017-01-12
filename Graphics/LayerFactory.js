var shaunlusk = shaunlusk || {};

/**
* @interface
*/
shaunlusk.LayerFactory = function() {

};

/** abstract */
shaunlusk.LayerFactory.prototype.getLayer = function(parentScreen, type, canvas, props) {
  throw new Error("getLayer() Not Implemented.");
};
