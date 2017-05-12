var shaunlusk = shaunlusk || {};

/** Draws images to a canvas.<br />
* Can be used to draw all or portions of images to a canvas.
* @constructor
* @param {integer} screenScaleX Horizontal scale of the shaunlusk.Screen
* @param {integer} screenScaleY Vertical scale of the shaunlusk.Screen
* @see shaunlusk.ImageElement
* @see shaunlusk.ImageSprite
*/
shaunlusk.ImageRenderer = function(screenScaleX, screenScaleY) {
  this._screenScaleX = screenScaleX;
  this._screenScaleY = screenScaleY;
};

/** Draws an image or portion of an image to the canvas.
* @param {CanvasContext} context The canvas to draw to.
* @param {Image} image Image reference, created by &lt;img&gt; or new Image();
* @param {number} sx The x starting point of a subsection of the image to draw.
* @param {number} sy The y starting point of a subsection of the image to draw.
* @param {number} sWidth The width of a subsection of the image to draw.
* @param {number} sHeight The height of a subsection of the image to draw.
* @param {number} x The target x position of the canvas to draw the image to.
* @param {number} y The target y position of the canvas to draw the image to.
* @param {number} width The target width of the drawn image. If different than the dimensions of the image subsection, the image subsection will be stretched or shrunk.
* @param {number} height The target height of the drawn image. If different than the dimensions of the image subsection, the image subsection will be stretched or shrunk.
* @param {integer} imageScaleX The amount to scale the drawn image horizontally.
* @param {integer} imageScaleY The amount to scale the drawn image vertically.
*/
shaunlusk.ImageRenderer.prototype.renderImage = function(context, image, sx, sy, sWidth, sHeight, x, y, width, height, imageScaleX, imageScaleY, rotation) {
  if (shaunlusk.isNullOrUndefined(rotation)) {
    context.drawImage(
      image,
      sx,
      sy,
      sWidth,
      sHeight,
      x * this.getScreenScaleX(),
      y * this.getScreenScaleY(),
      width * this.getTotalScaleX(imageScaleX),
      height * this.getTotalScaleY(imageScaleY));
  } else {
    this.renderRotatedImage(context, image, sx, sy, sWidth, sHeight, x, y, width, height, imageScaleX, imageScaleY, rotation);
  }
};

shaunlusk.ImageRenderer.prototype.renderRotatedImage = function(context, image, sx, sy, sWidth, sHeight, x, y, width, height, imageScaleX, imageScaleY, rotation) {
  var translationX = x * this.getScreenScaleX() + (width * this.getTotalScaleX(imageScaleX))/2;
  var translationY = y * this.getScreenScaleY() + (height * this.getTotalScaleY(imageScaleY))/2;
  shaunlusk.renderWithRotation(context, translationX, translationY, rotation, function() {
    context.drawImage(
      image,
      sx,
      sy,
      sWidth,
      sHeight,
      0 - (width * this.getTotalScaleX(imageScaleX))/2,
      0 - (height * this.getTotalScaleY(imageScaleY))/2,
      width * this.getTotalScaleX(imageScaleX),
      height * this.getTotalScaleY(imageScaleY));
  }.bind(this));

};

/**
* Return the horizontal scale of the renderer.
* @return {integer}
*/
shaunlusk.ImageRenderer.prototype.getScreenScaleX = function() {return this._screenScaleX;};

/**
* Return the vertical scale of the renderer.
* @return {integer}
*/
shaunlusk.ImageRenderer.prototype.getScreenScaleY = function() {return this._screenScaleY;};

/**
* Return the total horizontal scale (screen scale * image scale).
* @param {integer} imageScaleX The x amount to scale the portion of the image drawn to the canvas.
* @return {integer}
*/
shaunlusk.ImageRenderer.prototype.getTotalScaleX = function(imageScaleX) {return this._screenScaleX * imageScaleX;};

/**
* Return the total vertical scale (screen scale * image scale).
* @param {integer} imageScaleY The y amount to scale the portion of the image drawn to the canvas.
* @return {integer}
*/
shaunlusk.ImageRenderer.prototype.getTotalScaleY = function(imageScaleY) {return this._screenScaleY * imageScaleY;};
