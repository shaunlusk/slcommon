/** @namespace */
var shaunlusk = shaunlusk || {};

/** The Screen is the overriding container for Graphics components.
* The Screen orchestrates updating and rendering its layers, propagates
* mouse events down to the layers, and notifies event listeners when events occur.
* @constructor
* @param {HTMLElement} targetDiv The target HTMLElement into which the screen and its layers will be built.
* @param {Object} config Supported configuration properties:
* <ul>
*   <li>scaleX - integer - the horizontal scale of the screen.  Default: 1</li>
*   <li>scaleY - integer - the horizontal scale of the screen.  Default: 1</li>
*   <li>width - integer - Width for the screen (in px). Default: 800
*   <li>height - integer - Height for the screen (in px). Default: 600
*   <li>fpsElem - HTMLElement - Element to write Frames-per-second information to. </li>
*   <li>backgroundColor - Color - The color to set the screen background to.</li>
*   <li>borderColor - Color - The color to set the screen border to.</li>
*   <li>borderSize - integer - The borderSize of the screen, in pixels. Default: 1</li>
* </ul>
*/
shaunlusk.Screen = function(targetDiv, layerFactory, config) {
  this._targetDiv = targetDiv;
  this._layerFactory = layerFactory;
  this._config = config || {};
  this._scaleX = this._config.scaleX || 1;
  this._scaleY = this._config.scaleY || 1;
  this._width = (config.width || 800) * this._scaleX;
  this._height = (config.height || 600) * this._scaleY;
  this._fpsElem = this._config.fpsElem || null;
  this._avgTime = 0;
  this._last = 0;
  this._mouseX = -1;
  this._mouseY = -1;
  this._mouseRow = -1;
  this._mouseCol = -1;
  this._mouseMoved = false;
  this._paused = false;
  this._unpaused = false;

  this._backgroundColor = this._config.backgroundColor || "black";
  this._borderColor = this._config.borderColor || "grey";
  this._borderSize = this._config.borderSize || 1;

  this._fpsMonitorArray = [];
  this._fpsMonitorIndex = 0;

  this._layers = [];

  this._eventListeners = {};
};

shaunlusk.Screen.document = window.document;

/** Setup the screen on the page. Must be called prior to rendering.
*/
shaunlusk.Screen.prototype.initialize = function() {
  this._prepareDiv();
  this._setupEventListeners();
};

/** @private */
shaunlusk.Screen.prototype._prepareDiv = function() {
  this._targetDiv.style.width = this._width;
  this._targetDiv.style.height = this._height;
  this._targetDiv.style.backgroundColor = this._backgroundColor;
  this._targetDiv.style.border = this._borderSize + "px solid " + this._borderColor;
};

/** @private */
shaunlusk.Screen.prototype._setupEventListeners = function() {
  this._targetDiv.addEventListener("mouseup",this.handleMouseEvent.bind(this), true);
  this._targetDiv.addEventListener("mousedown",this.handleMouseEvent.bind(this), true);
  this._targetDiv.addEventListener("mousemove",this.handleMouseMoveEvent.bind(this), true);
  shaunlusk.Screen.document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this), false);
};

/** @private */
shaunlusk.Screen.prototype.handleVisibilityChange = function() {
  this._tabNotVisible = document.hidden;
  if (!this._tabNotVisible && !this._paused) {
    this._unpaused = true;
    requestAnimationFrame(this.render.bind(this));
  }
};

/** Add an event listener to the document.
* @param {string} event The type of event.
* @param {Function} listener The function to call when the event occurs.
*/
shaunlusk.Screen.prototype.addEventListenerToDocument = function(event, listener) {
  shaunlusk.Screen.document.addEventListener(event,listener);
};

/** Set the background color.
* @param {string} color Any valid CSS color string, or shaunlusk.Color value.
*/
shaunlusk.Screen.prototype.setBackgroundColor = function(color) {
  this._backgroundColor = color;
  this._targetDiv.style.backgroundColor = color;
};

/** Return the current backgroundColor.
* @returns {string}
*/
shaunlusk.Screen.prototype.getBackgroundColor = function(color) {
  return this._backgroundColor;
};

/** Set the border color.
* @param {string} color Any valid CSS color string, or shaunlusk.Color value.
*/
shaunlusk.Screen.prototype.setBorderColor = function(color) {
  this._borderColor = color;
  this._targetDiv.style.border = this._borderSize + "px solid " + color;
};

/** Return the current border color.
* @returns {string}
*/
shaunlusk.Screen.prototype.getBorderColor = function() {
  return this._borderColor;
};

/** Set the border size.
* @param {integer} size The size for the border; will be interpretted as pixels.
*/
shaunlusk.Screen.prototype.setBorderSize = function(size) {
  this._borderSize = size;
  this._targetDiv.style.border = size + "px solid " + this._borderColor;
};

/** Return the current border size, in pixels.
* @returns {integer}
*/
shaunlusk.Screen.prototype.getBorderSize = function() {
  return this._borderSize;
};

/** Return the width.
* @returns {integer}
*/
shaunlusk.Screen.prototype.getWidth = function() {return this._width;};

/** Return the height.
* @returns {integer}
*/
shaunlusk.Screen.prototype.getHeight = function() {return this._height;};

/** Return the x-scale.
* @returns {integer}
*/
shaunlusk.Screen.prototype.getScaleX = function() {return this._scaleX;};

/** Return the y-scale.
* @returns {integer}
*/
shaunlusk.Screen.prototype.getScaleY = function() {return this._scaleY;};

/** Return the current x coordinate of the mouse.
* @returns {integer}
*/
shaunlusk.Screen.prototype.getMouseX = function() {return this._mouseX;};

/** Return the current y coordinate of the mouse.
* @returns {integer}
*/
shaunlusk.Screen.prototype.getMouseY = function() {return this._mouseY;};

/** Create a new {@link shaunlusk.Layer} and add it to this screen.  Layers will be rendered in FIFO order,
* so layers added later will be drawn on top of layers added earlier.
* @param {string} type The type of layer to add - either "TextLayer" or "GfxLayer"
* @see shaunlusk.Layer
*/
shaunlusk.Screen.prototype.createLayer = function(type, props) {
  var canvas = document.createElement("CANVAS");
  this._targetDiv.appendChild(canvas);
  canvas.width = this._width;
  canvas.height = this._height;
  canvas.style.position = "absolute";
  props = props || {};
  props.width = this.getWidth();
  props.height = this.getHeight();

  var layer = this._layerFactory.getLayer(this, type, canvas, props);

  this.addLayer(layer);
  return layer;
};

/** Add a new  {@link shaunlusk.Layer} to this screen.  The preferred method of adding layers
* is via the createLayer() method, but this will also work.
* Layers will be rendered in FIFO order,
* so layers added later will be drawn on top of layers added earlier.
* @param {shaunlusk.Layer} layer The layer to add to the screen.
* @see shaunlusk.Layer
*/
shaunlusk.Screen.prototype.addLayer = function(layer) {
  this._layers.push(layer);
};

/** Return the array of layers.
* @returns {Array}
*/
shaunlusk.Screen.prototype.getLayers = function() {
  return this._layers;
};

/** Pause or unpause the screen.
* @param {boolean} boolean true = pause the screen; false = unpause the screen.
*/
shaunlusk.Screen.prototype.setPaused = function(boolean) {
  if (this._paused && !boolean) this._unpaused = true;
  this._paused = boolean;
  this.notify(
    new shaunlusk.Event(
      this._paused ? shaunlusk.EventType.SCREEN_PAUSED : shaunlusk.EventType.SCREEN_RESUMED
    )
  );
  if (!this._paused) requestAnimationFrame(this.render.bind(this));
};

/** Return whether the screen is paused
* @returns {boolean}
*/
shaunlusk.Screen.prototype.isPaused = function() {return this._paused;};



/** Render the screen and all layers.
* @param {number} time The current time in milliseconds.
*/
shaunlusk.Screen.prototype.render = function(time) {
  time = time || 1;
  if (this._paused || this._tabNotVisible) return;
  if (this._unpaused) {
    this._unpaused = false;
    this._last = Math.floor(time) - 1;
  }
  time = Math.floor(time);
  var elapsed = Date.now();
  var diff = time - this._last;
  this._last = time;

  if (this._mouseMoved) {
    this._handleMouseMoveEvent(time);
  }

  this.notify(
    new shaunlusk.Event(shaunlusk.EventType.BEFORE_RENDER, {diff:diff}, time)
  );

  this._updateFps(diff);

  this._update(time,diff);
  this._render(time,diff);

  this.notify(
    new shaunlusk.Event(shaunlusk.EventType.AFTER_RENDER,  {diff:diff}, time)
  );

  elapsed = Date.now() - elapsed;
  if (this._fpsElem && this._fpsMonitorIndex === 0)
    this._fpsElem.innerHTML += "<br />Avg MS per frame: " + elapsed;

  requestAnimationFrame(this.render.bind(this));
};

/** @private */
shaunlusk.Screen.prototype._handleMouseMoveEvent = function(time) {
  var event = new shaunlusk.Event(
    shaunlusk.EventType.MOUSE_MOVE,
    {
      x : this._mouseX,
      y : this._mouseY,
      row : this._mouseRow,
      col : this._mouseCol,
    },
    time
  );
  this.notify(event);
  this.propagateMouseEventThroughLayers(event);
  this._mouseMoved = false;
};

/** @private */
shaunlusk.Screen.prototype._updateFps = function(diff) {
  if (this._fpsElem) {
    var fps = Math.floor(1000 / diff);
    if (this._fpsMonitorArray.length < 30){
      this._fpsMonitorArray.push(fps);
    } else {
      this._fpsMonitorArray[this._fpsMonitorIndex] = fps;
    }
    this._fpsMonitorIndex++;
    if (this._fpsMonitorIndex >= 30) this._fpsMonitorIndex = 0;

    var fpsa = 1;
    for (var i = 0; i < this._fpsMonitorArray.length; i++){
      fpsa += this._fpsMonitorArray[i] / 30;
    }
    if (this._fpsElem && this._fpsMonitorIndex === 0)
      this._fpsElem.innerHTML = "fps: " + Math.floor(fpsa);
  }
};

/** @private */
shaunlusk.Screen.prototype._update = function (time,diff) {
  for (var i = 0; i < this._layers.length; i++) {
    this._layers[i].update(time,diff);
  }
};

/** @private */
shaunlusk.Screen.prototype._render = function(time,diff) {
  for (var i = 0; i < this._layers.length; i++) {
    this._layers[i].render(time,diff);
  }
};

/** Handle a mouse move event.  This does not directly propagate the event to
* layers and elements; rather it will flag that a mouse movement has occured, and records its current location.
* The event will be propagated during the next render cycle.
* @param {Event} e The mouse event
*/
shaunlusk.Screen.prototype.handleMouseMoveEvent = function(e) {
  if (this._paused) return false;
  this._mouseMoved = true;
  var x = this.getXFromMouseEvent(e);
  var y = this.getYFromMouseEvent(e);

  if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
    this._mouseX = -1;
    this._mouseY = -1;
    this._mouseRow = -1;
    this._mouseCol = -1;
    return false;
  }
  var row = this.getRowFromMouseEvent(e);
  var col = this.getColFromMouseEvent(e);
  this._mouseX = x;
  this._mouseY = y;
  this._mouseRow = row;
  this._mouseCol = col;
};

/** Handles mouse up and mouse down events; notifies any local handlers and propagates the event to all layers.
* @param {Event} e The mouse event
*/
shaunlusk.Screen.prototype.handleMouseEvent = function(e) {
  if (this._paused) return false;
  var x = this.getXFromMouseEvent(e);
  var y = this.getYFromMouseEvent(e);

  if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
    return false;
  }
  var row = this.getRowFromMouseEvent(e);
  var col = this.getColFromMouseEvent(e);

  var type = e.type === "mouseup" ? shaunlusk.EventType.MOUSE_UP : shaunlusk.EventType.MOUSE_DOWN;
  var event = new shaunlusk.Event(
    type,
    {
      x : this._mouseX,
      y : this._mouseY,
      row : this._mouseRow,
      col : this._mouseCol,
      baseEvent : e
    });
  this.notify(event);

  // propagate through layers
  this.propagateMouseEventThroughLayers(event);

  if (e.button === 1) return false;
};

/** @private */
shaunlusk.Screen.prototype.propagateMouseEventThroughLayers = function(event) {
  for (var i = 0; i < this._layers.length; i++) {
    this._layers[i].handleMouseEvent(event);
  }
};

/** Return the x coordinate from a mouse event.  Accounts for screen position.
* @param {Event} e Mouse Event
*/
shaunlusk.Screen.prototype.getXFromMouseEvent = function(e) {
  return (e.pageX - (this._targetDiv.offsetLeft + this._borderSize));
};

/** Return the y coordinate from a mouse event.  Accounts for screen position.
* @param {Event} e Mouse Event
*/
shaunlusk.Screen.prototype.getYFromMouseEvent = function(e) {
  return (e.pageY - (this._targetDiv.offsetTop + this._borderSize));
};

/** Return the column coordinate from a mouse event.  Accounts for screen position.
* @param {Event} e Mouse Event
*/
shaunlusk.Screen.prototype.getColFromMouseEvent = function(e) {
  return Math.floor(this.getXFromMouseEvent(e) / (shaunlusk.CELLWIDTH * this._scaleX));
};

/** Return the row coordinate from a mouse event.  Accounts for screen position.
* @param {Event} e Mouse Event
*/
shaunlusk.Screen.prototype.getRowFromMouseEvent = function(e) {
  return Math.floor(this.getYFromMouseEvent(e) / (shaunlusk.CELLHEIGHT * this._scaleY));
};
