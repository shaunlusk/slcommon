var shaunlusk = shaunlusk || {};

/**
* Abstract class for graphical layers on a shaunlusk.Screen.<br />
* Existing implementations: {@link shaunlusk.TextLayer}, {@link shaunlusk.GfxLayer}
* @constructor
* @param {shaunlusk.Screen} screenContext The parent screen
* @param {CanvasContext} canvas The canvas context that this layer will draw to.
* @param {Object} props The properties for this layer:
* <ul>
*   <li>width - number - The width of the layer.  Should match Screen.</li>
*   <li>height - number - The height of the layer.  Should match Screen.</li>
* </ul>
* @see shaunlusk.TextLayer
* @see shaunlusk.GfxLayer
*/
shaunlusk.Layer = function(screenContext, canvas, props) {
  props = props || {};
  this._width = props.width || 320;
  this._height = props.height || 200;
  this._screenContext = screenContext;
  this._canvas = canvas;
  this._canvasContext = canvas ? canvas.getContext("2d") : null;
};

/** Returns the width of the Layer
* @returns {number}
*/
shaunlusk.Layer.prototype.getWidth = function() {return this._width;};

/** Returns the height of the Layer
* @returns {number}
*/
shaunlusk.Layer.prototype.getHeight = function() {return this._height;};

/** Returns the parent shaunlusk.Screen
* @returns {shaunlusk.Screen}
*/
shaunlusk.Layer.prototype.getScreenContext = function() {return this._screenContext;};

/** Returns the Canvas for this layer.
* <b>Note</b>: this does not return the drawable CanvasContext, rather it returns the reference to the DOM element.
* @returns {HTMLElement}
*/
shaunlusk.Layer.prototype.getCanvas = function() {return this._canvas;};

/** Returns the CanvasContext for this layer.
* @returns {CanvasContext}
*/
shaunlusk.Layer.prototype.getCanvasContext = function() {return this._canvasContext;};

/** Update this Layer. <b>Sub-classes MUST implement this method</b>
* @abstract
* @param {number} time The current time (milliseconds)
* @param {number} diff The difference between the last time and the current time  (milliseconds)
*/
shaunlusk.Layer.prototype.update = function(time,diff) {};

/** Render this Layer. <b>Sub-classes MUST implement this method</b>
* @abstract
* @param {number} time The current time (milliseconds)
* @param {number} diff The difference between the last time and the current time  (milliseconds)
*/
shaunlusk.Layer.prototype.render = function(time,diff) {};

/** Propagate a mouse event to this Layer. <b>Sub-classes MUST implement this method</b>
* @abstract
* @param {shaunlusk.Event} event The mouse event
*/
shaunlusk.Layer.prototype.handleMouseEvent = function(event) {};

/** Clears all contents of this Layer.
*/
shaunlusk.Layer.prototype.clearLayer = function() {
  this._canvasContext.clearRect(0, 0, this.getWidth(), this.getHeight());
};

shaunlusk.Layer.prototype.dimLayer = function(amount, steps, interval) {
  var stepAmount = amount / steps;
  setTimeout(this._dimStep.bind(this, stepAmount, stepAmount, steps, interval), interval);

};
shaunlusk.Layer.prototype._dimStep = function(amount, stepAmount, steps, interval) {
  var canvasContext = this.getCanvasContext();
  canvasContext.clearRect(0, 0, this.getWidth(), this.getHeight());
  canvasContext.fillStyle = "rgba(0,0,0," + amount + ")";
  canvasContext.fillRect(0, 0, this.getWidth(), this.getHeight());
  if (steps > 0) {
    setTimeout(this._dimStep.bind(this, amount + stepAmount, stepAmount, steps - 1, interval), interval);
  }
};
