var shaunlusk = shaunlusk || {};

shaunlusk.ElementRotationContext = function(parentElement) {
  this._parentElement = parentElement;
  this._rotation = null;
  this._baseRotation = props.baseRotation || null;

  this._diagonalSize = 0; // only needed for determining collision box when rotated
  this._rotatedX = 0;
  this._rotatedY = 0;
  this._rotatedLastX = 0;
  this._rotatedLastY = 0;
  this._lastDiagonalSize = 0;
};

shaunlusk.ElementRotationContext.prototype.prerender = function() {
  if (!this.getRotation()) return;
  this._parentElement.getCanvasContext().save();
  this._parentElement.getCanvasContext().translate(this._parentElement.getScaledX() + Math.floor(this._parentElement.getScaledWidth()/2), this._parentElement.getScaledY() + Math.floor(this._parentElement.getScaledHeight()/2));
  this._parentElement.getCanvasContext().rotate(this.getRotation());
};

shaunlusk.ElementRotationContext.prototype.postRender = function() {
  if (!this.getRotation()) return;
  this._parentElement.getCanvasContext().restore();
  this._rotatedLastX = this._rotatedX;
  this._rotatedLastY = this._rotatedY;
  this._lastDiagonalSize = this._diagonalSize;
};

shaunlusk.ElementRotationContext.prototype.getUnAdjustedRotation = function() { return this._rotation; };
shaunlusk.ElementRotationContext.prototype.getBaseRotation = function() { return this._baseRotation; };
shaunlusk.ElementRotationContext.prototype.getRotation = function() {
  if (this._rotation || this._baseRotation)
  return (this._rotation || 0) + (this._baseRotation || 0);
  return null;
};

shaunlusk.ElementRotationContext.prototype.setRotation = function(rotation) {
  if (this._rotation !== rotation) {
    this._parentElement.setDirty(true);
    this._rotation = rotation;
    this._recalculateDiagonalSize();
    this._recalculateRotatedCollisionBox();
  }
};

shaunlusk.ElementRotationContext.prototype.setBaseRotation = function(rotation) {
  if (this._baseRotation !== rotation) {
    this.setDirty(true);
    this._baseRotation = rotation;
    this._recalculateDiagonalSize();
    this._recalculateRotatedCollisionBox();
  }
};

shaunlusk.ElementRotationContext.prototype._recalculateDiagonalSize = function() {
  if (!this.getRotation()) return;
  // calculate diagonal
  // Note that for any amount of rotation, an expanded bounding box is used
  this._diagonalSize = Math.ceil(Math.sqrt( Math.pow(this._parentElement.getScaledWidth(), 2) + Math.pow(this._parentElement.getScaledHeight(), 2)));
};

shaunlusk.ElementRotationContext.prototype._recalculateRotatedCollisionBox = function() {
  if (this.getRotation() === null) return;
  this._rotatedX = Math.floor(this._parentElement.getScaledX() - (this._diagonalSize - this._parentElement.getScaledWidth()) / 2);
  this._rotatedY = Math.floor(this._parentElement.getScaledY() - (this._diagonalSize - this._parentElement.getScaledHeight()) / 2);
};
