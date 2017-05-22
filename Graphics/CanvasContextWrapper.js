var SL = SL || {};

SL.CanvasContextWrapper = function(canvas, viewOriginX, viewOriginY) {
  this._canvas = canvas;
  this._canvasContext = canvas.getContext("2d");
  this._viewOriginX = viewOriginX || 0;
  this._viewOriginY = viewOriginY || 0;
};

SL.CanvasContextWrapper.prototype.getViewOriginX = function() {return this._viewOriginX;};
SL.CanvasContextWrapper.prototype.getViewOriginY = function() {return this._viewOriginY;};

SL.CanvasContextWrapper.prototype.setViewOriginX = function(viewOriginX) {this._viewOriginX = viewOriginX;};
SL.CanvasContextWrapper.prototype.setViewOriginY = function(viewOriginY) {this._viewOriginY = viewOriginY;};

SL.CanvasContextWrapper.prototype.getCanvas = function() {return this._canvas;};
SL.CanvasContextWrapper.prototype.getCanvasContext = function() {return this._canvasContext;};

SL.CanvasContextWrapper.prototype.clearRect = function(x, y, width, height) {
  this._canvasContext.clearRect(x + this._viewOriginX, y + this._viewOriginY, width, height);
};

SL.CanvasContextWrapper.prototype.fillRect = function(x, y, width, height) {
  this._canvasContext.fillRect(x + this._viewOriginX, y + this._viewOriginY, width, height);
};

SL.CanvasContextWrapper.prototype.drawImage = function(image, sx, sy, sWidth, sHeight, x, y, width, height) {
  this._canvasContext.drawImage(image, sx, sy, sWidth, sHeight, x + this._viewOriginX, y + this._viewOriginY, width, height);
};

SL.CanvasContextWrapper.prototype.save = function() {
  this._canvasContext.save();
};

SL.CanvasContextWrapper.prototype.restore = function() {
  this._canvasContext.restore();
};

SL.CanvasContextWrapper.prototype.translate = function(x, y) {
  this._canvasContext.translate(x + this._viewOriginX, y + this._viewOriginY);
};

SL.CanvasContextWrapper.prototype.scale = function(x, y) {
  this._canvasContext.scale(x, y);
};

SL.CanvasContextWrapper.prototype.rotate = function(rotation) {
  this._canvasContext.rotate(rotation);
};

/*

fillStyle - needs to be applied at fillRect time
*/
