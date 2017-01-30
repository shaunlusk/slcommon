var shaunlusk = shaunlusk || {};

shaunlusk.EventType = shaunlusk.EventType || {};
shaunlusk.EventType.ELEMENT_MOVED = "ELEMENT_MOVED";
shaunlusk.EventType.ELEMENT_STARTED_MOVING = "ELEMENT_STARTED_MOVING";
shaunlusk.EventType.ELEMENT_STOPPED_MOVING = "ELEMENT_STOPPED_MOVING";
shaunlusk.EventType.ELEMENT_COLLISION = "ELEMENT_COLLISION";
shaunlusk.EventType.MOUSE_ENTER_ELEMENT = "MOUSE_ENTER_ELEMENT";
shaunlusk.EventType.MOUSE_EXIT_ELEMENT = "MOUSE_EXIT_ELEMENT";
shaunlusk.EventType.MOUSE_MOVE_OVER_ELEMENT = "MOUSE_MOVE_OVER_ELEMENT";
shaunlusk.EventType.MOUSE_DOWN_ON_ELEMENT = "MOUSE_DOWN_ON_ELEMENT";
shaunlusk.EventType.MOUSE_UP_ON_ELEMENT = "MOUSE_UP_ON_ELEMENT";
shaunlusk.EventType.ELEMENT_HIT_LEFT_EDGE = "ELEMENT_HIT_LEFT_EDGE";
shaunlusk.EventType.ELEMENT_HIT_RIGHT_EDGE = "ELEMENT_HIT_RIGHT_EDGE";
shaunlusk.EventType.ELEMENT_HIT_TOP_EDGE = "ELEMENT_HIT_TOP_EDGE";
shaunlusk.EventType.ELEMENT_HIT_BOTTOM_EDGE = "ELEMENT_HIT_BOTTOM_EDGE";

/**
* <p>Graphics element base class.</p>
* <p>* Current Implementations:
* <ul>
*   <li>{@link shaunlusk.ImageElement}</li>
*   <li>{@link shaunlusk.Sprite}
*     <ul>
*       <li>{@link shaunlusk.ImageSprite}</li>
*     </ul>
*   </li>
* </ul>
* <p>GfxElements support two types of movement: moveTo() instructions and movementRates.
* The former, moveTo() will send an element toward a specified set of coordinates, scheduled to arrive after a
* specified duration.  The latter, movementRates, will start an element moving at a given rate and continue until stopped.
* See moveTo() and setMoveRates() for more details.</p>
* <p>GfxElements emit a number of events:
* <ul>
*   <li>ELEMENT_MOVED : Any time the element moves.</li>
*   <li>ELEMENT_STARTED_MOVING : When the element starts moving.</li>
*   <li>ELEMENT_STOPPED_MOVING : When the element stops moving.</li>
*   <li>ELEMENT_COLLISION : When the element collides with another.</li>
*   <li>MOUSE_ENTER_ELEMENT : When the mouse enters the element's bounding box.</li>
*   <li>MOUSE_EXIT_ELEMENT : When the mouse leaves the element's bouding box.</li>
*   <li>MOUSE_MOVE_OVER_ELEMENT : When the mouse moves and is over the element.</li>
*   <li>MOUSE_DOWN_ON_ELEMENT : When there is a mouse down event on the element.</li>
*   <li>MOUSE_UP_ON_ELEMENT : When there is a mouse up event on the element.</li>
*   <li>ELEMENT_HIT_LEFT_EDGE : When the element hits the left edge of its layer.</li>
*   <li>ELEMENT_HIT_RIGHT_EDGE : When the element hits the right edge of its layer.</li>
*   <li>ELEMENT_HIT_TOP_EDGE : When the element hits the top edge of its layer.</li>
*   <li>ELEMENT_HIT_BOTTOM_EDGE : When the element hits the bottom edge of its layer.</li>
* </ul>
* In most cases, the event data will include an 'element' property that refers to the element.  The only exception is ELEMENT_COLLISION;
* this will have element1 and element2 properties, where element1 is the element on which collidesWith() was called, and element2 was the element passed to the method.</p>
* <p>In addition to the element property, the mouse events will also include x,y, and row, column properties in the data, corresponding to the coordinates of the event. </p>
*
* <p>Event listeners can be attached to individual elements, or at the screen level.  Refer to documentation on the "on" and "notify" methods.</p>
* @constructor
* @param {shaunlusk.Screen} screenContext The target screen.
* @param {shaunlusk.GfxLayer} parentLayer The parent layer that will draw this element.
* @param {Object} props Properties for this GfxElement.  Supports:
*   <ul>
*     <li>scaleX - integer - Horizontal scale of this element.  Independent of screen scale.</li>
*     <li>scaleY - integer - Vertical scale of this element.  Independent of screen scale.</li>
*     <li>hidden - boolean - Whether to hide this element.</li>
*     <li>x - number - The X coordinate for this element.</li>
*     <li>y - number - The Y coordinate for this element.</li>
*     <li>zIndex - number - The z-index; elements with higher zIndex values will be drawn later than those with lower values (drawn on top of those with lower values).</li>
*   </ul>
*/
shaunlusk.GfxElement = function(screenContext, parentLayer, props) {
  props = props || {};
  this._id = shaunlusk.GfxElement.id++;
  this._screenContext = screenContext;
  this._parentLayer = parentLayer;
  this._canvasContext = parentLayer ? parentLayer.getCanvasContext() : null;
  this._scaleX = props.scaleX || 1;
  this._scaleY = props.scaleY || 1;
  this._currentMove = null;
  this._moveQueue = new shaunlusk.Queue();
  this._xMoveRate = 0;
  this._xMoveFractionalAccumulator = 0;
  this._yMoveRate = 0;
  this._yMoveFractionalAccumulator = 0;
  this._dirty = true;
  this._hasCollision = false;
  this._hadCollisionPreviousFrame = false;
  this._hidden = props.hidden || false;
  this._x = props.x || 0;
  this._y = props.y || 0;
  this._lastX = 0;
  this._lastY = 0;
  this._mouseIsOver = false;
  this._zIndex = props.zIndex || -1;
  this._zIndexComparable = new shaunlusk.GfxElementZIndexComparable(this);

  this.EventNotifierMixinInitializer({
    eventListeners:[
      shaunlusk.EventType.ELEMENT_MOVED,
      shaunlusk.EventType.ELEMENT_STARTED_MOVING,
      shaunlusk.EventType.ELEMENT_STOPPED_MOVING,
      shaunlusk.EventType.ELEMENT_COLLISION,
      shaunlusk.EventType.MOUSE_ENTER_ELEMENT,
      shaunlusk.EventType.MOUSE_EXIT_ELEMENT,
      shaunlusk.EventType.MOUSE_MOVE_OVER_ELEMENT,
      shaunlusk.EventType.MOUSE_DOWN_ON_ELEMENT,
      shaunlusk.EventType.MOUSE_UP_ON_ELEMENT,
      shaunlusk.EventType.ELEMENT_HIT_LEFT_EDGE,
      shaunlusk.EventType.ELEMENT_HIT_RIGHT_EDGE,
      shaunlusk.EventType.ELEMENT_HIT_TOP_EDGE,
      shaunlusk.EventType.ELEMENT_HIT_BOTTOM_EDGE,
    ]
  });
};

shaunlusk.EventNotifierMixin.call(shaunlusk.GfxElement.prototype);
shaunlusk.GfxElement.prototype._baseNotify = shaunlusk.GfxElement.prototype.notify;

shaunlusk.GfxElement.prototype.notify = function(event) {
  this._baseNotify(event);
  this.getScreenContext().notify(event);
};


/** @private */
shaunlusk.GfxElement.id = 0;

/** Return the unique id of this element.
* @return {integer} This element's unique id.
*/
shaunlusk.GfxElement.prototype.getId = function() {return this._id;};

/** Return whether this element is dirty.
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.isDirty = function() {
  return this._dirty || this._hasCollision || this._hadCollisionPreviousFrame;
};

/**
* Set whether element is dirty.  If dirty, the element will be cleared and redrawn during the next render phase.
* @param {boolean} dirty
*/
shaunlusk.GfxElement.prototype.setDirty = function(dirty) {this._dirty = dirty;};

/** Return whether this element is hidden.
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.isHidden = function() {return this._hidden;};

/**
* Set whether element is hidden.
* @param {boolean} hidden
*/
shaunlusk.GfxElement.prototype.setHidden = function(hidden) {this._hidden = hidden;};

/** Return whether this element had a collision during the most recent update phase.
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.hasCollision = function() {return this._hasCollision;};

/**
* Set whether the element has a collision. If a collision has occurred the element will be cleared and redrawn during the next render phase.
* @param {boolean} hidden
*/
shaunlusk.GfxElement.prototype.setHasCollision = function(hasCollision) {this._hasCollision = hasCollision;};

/**
* Return this element's zIndex.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getZIndex = function() {return this._zIndex;};

/**
* Set this element's zIndex. Elements with higher zIndex values will be drawn later than those with lower values (drawn on top of those with lower values).
* @param {number} zIndex
*/
shaunlusk.GfxElement.prototype.setZIndex = function(zIndex) {
  this._zIndex = zIndex;
  this.setDirty(true);
};

/** Return this element's zindeComparable.
* Used by parent layer to determine rendering order.
* @return {shaunlusk.GfxElementZIndexComparable}
*/
shaunlusk.GfxElement.prototype.getZIndexComparable = function() {
  return this._zIndexComparable;
};

/**
* Return this element's parent layer.
* @return {shaunlusk.GfxLayer}
*/
shaunlusk.GfxElement.prototype.getParentLayer = function() {return this._parentLayer;};

/**
* Return the canvas context for this element's parent layer.
* @return {CanvasContext}
*/
shaunlusk.GfxElement.prototype.getCanvasContext = function() {return this._canvasContext;};

/**
* Return the parent Screen for this element.
* @return {shaunlusk.Screen}
*/
shaunlusk.GfxElement.prototype.getScreenContext = function() {return this._screenContext;};

/**
* Return the horizontal scale of this element's parent screen.
* @return {integer}
*/
shaunlusk.GfxElement.prototype.getScreenScaleX = function() {return this.getScreenContext().getScaleX();};

/**
* Return the vertical scale of this element's parent screen.
* @return {integer}
*/
shaunlusk.GfxElement.prototype.getScreenScaleY = function() {return this.getScreenContext().getScaleY();};

/**
* Return the total horizontal scale for this element (screen scale * element scale).
* @return {integer}
*/
shaunlusk.GfxElement.prototype.getTotalScaleX = function() {return this.getElementScaleX() * this.getScreenContext().getScaleX();};

/**
* Return the total vertical scale for this element (screen scale * element scale).
* @return {integer}
*/
shaunlusk.GfxElement.prototype.getTotalScaleY = function() {return this.getElementScaleY() * this.getScreenContext().getScaleY();};

/**
* Return the horizontal scale of this element.
* @return {integer}
*/
shaunlusk.GfxElement.prototype.getElementScaleX = function() {return this._scaleX;};

/**
* Return the vertical scale of this element.
* @return {integer}
*/
shaunlusk.GfxElement.prototype.getElementScaleY = function() {return this._scaleY;};

/**
* Set the horizontal scale of this element.
* @param {integer} scaleX
*/
shaunlusk.GfxElement.prototype.setElementScaleX = function(scaleX) {
  this._scaleX = scaleX;
};

/**
* Set the vertical scale of this element.
* @param {integer} scaleY
*/
shaunlusk.GfxElement.prototype.setElementScaleY = function(scaleY) {this._scaleY = scaleY;};

/**
* Get the x coordinate of this element.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getX = function() {return this._x;};

/**
* Get the y coordinate of this element.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getY = function() {return this._y;};

/**
* Set the x coordinate of this element.
* @param {number} x
*/
shaunlusk.GfxElement.prototype.setX = function(x) {
  if (x !== this._x) this.setDirty(true);
  this._x = x;
};

/**
* Set the y coordinate of this element.
* @param {number} y
*/
shaunlusk.GfxElement.prototype.setY = function(y) {
  if (y !== this._y) this.setDirty(true);
  this._y = y;
};

/**
* Get the x coordinate of this element for the previous frame.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getLastX = function() {return this._lastX;};

/**
* Get the y coordinate of this element for the previous frame.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getLastY = function() {return this._lastY;};

/** @private */
shaunlusk.GfxElement.prototype.setLastX = function(x) {this._lastX = x;};
/** @private */
shaunlusk.GfxElement.prototype.setLastY = function(y) {this._lastY = y;};

/**
* Return whether the mouse is over this element.
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.isMouseOver = function() {return this._mouseIsOver;};

/**
* Return this element's width. <b>Sub-classes must implement this method!</b>
* @abstract
* @return {number}
*/
shaunlusk.GfxElement.prototype.getWidth = function() {throw new Error("getWidth needs to be implemented on this element.");};

/**
* Return this elements height. <b>Sub-classes must implement this method!</b>
* @abstract
* @return {number}
*/
shaunlusk.GfxElement.prototype.getHeight = function() {throw new Error("getHeight needs to be implemented on this element.");};

/**
* Set the horizontal and vertical movement rates for this element.
* Rates will be treated as approximately pixels per second.
* Negative values will move the element left for xMoveRate or up for yMoveRate.
* Zero values will halt movement on a given axis.
* Positive values will move the element right for xMoveRate or down for yMoveRate.
* Note that moveTo instructions will supercede movement rates in determining the element's position.
* @param {number} xMoveRate Horizontal movement rate
* @param {number} yMoveRate Vertical movement rate
*/
shaunlusk.GfxElement.prototype.setMoveRates = function(xMoveRate, yMoveRate) {
  if (xMoveRate === 0 && yMoveRate === 0 && this._currentMove === null && (this._xMoveRate !== 0 || this._yMoveRate !== 0)) {
    this.notify(
      new shaunlusk.Event(shaunlusk.EventType.ELEMENT_STOPPED_MOVING, {element:this})
    );
  } else if ((xMoveRate !== 0 || yMoveRate !== 0) && this._currentMove === null && this._xMoveRate === 0 && this._yMoveRate === 0) {
    this.notify(
      new shaunlusk.Event(shaunlusk.EventType.ELEMENT_STARTED_MOVING, {element:this})
    );
  }

  this._xMoveRate = xMoveRate;
  this._yMoveRate = yMoveRate;
};

/**
* Return the current x movement rate.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getMoveRateX = function() {return this._xMoveRate;};

/**
* Return the current y movement rate.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getMoveRateY = function() {return this._yMoveRate;};

/**
* Move the element to the specified coordinate over the course of specified duration.
* Calls to this method are queued and executed one after the other.
* Note that movement effect created by this method will supercede any movement rates for the given duration.
* @param {number} x The target x coordinate
* @param {number} y The target y coordinate
* @param {number} duration Optional. How long it should take the element to move from its current position to the target position, in milliseconds. Defaults to 16ms.
* @param {function} callback Optional.  The function to call when the move is complete.
*/
shaunlusk.GfxElement.prototype.moveTo = function(x,y,duration, callback) {
  duration = duration || 16;
  var moveOrder = new shaunlusk.MoveOrder(this, x, y, duration, this.moveOrderCallback.bind(this), callback);
  this._moveQueue.push(moveOrder);
  if (this._currentMove === null) {
    this._runMove();
    // If not already moving, fire start move event
    if (this.getMoveRateX() === 0 && this.getMoveRateY() === 0) {
      this.notify(
        new shaunlusk.Event(shaunlusk.EventType.ELEMENT_STARTED_MOVING, {element:this})
      );
    }
  }
};

/** @private */
shaunlusk.GfxElement.prototype._runMove = function() {
  if (this._moveQueue.size() > 0) {
    this._currentMove = this._moveQueue.pop();
    this._currentMove.start();
    return true;
  }
  // If no additional movement, fire end move event
  if (this.getMoveRateX() === 0 && this.getMoveRateY() === 0) {
    this.notify(
      new shaunlusk.Event(shaunlusk.EventType.ELEMENT_STOPPED_MOVING, {element:this})
    );
  }
  this._currentMove = null;
  return false;
};

/** @private */
shaunlusk.GfxElement.prototype.moveOrderCallback = function() {
  this._currentMove = null;
  this._runMove();
};

/**
* Clear any queued moveTo instructions.
* Does not effect a currently running moveTo, or any movement rates.
*/
shaunlusk.GfxElement.prototype.clearMoveQueue = function() {
  this._moveQueue.clear();
};

/**
* Turn the element "off".
* All movement will cease and element will be hidden.
*/
shaunlusk.GfxElement.prototype.turnOff = function() {
  this._moveQueue.clear();
  this._currentMove = null;
  this._xMoveRate = 0;
  this._xMoveFractionalAccumulator = 0;
  this._yMoveRate = 0;
  this._yMoveFractionalAccumulator = 0;
  this.hide();
};

/** Show the element. */
shaunlusk.GfxElement.prototype.show = function() {
  this._hidden = false;
  this.setDirty(true);
};

/** Hide the element */
shaunlusk.GfxElement.prototype.hide = function() {
  this._hidden = true;
  this.setDirty(true);
};

/** Update the element.  Will update location based on current time/diff.
* @param {number} time The current time.  Not specifically used, but provided for extension.
* @param {number} diff The difference between the previous time and the current time. Use to calculate element's position if it is moving.
* @return {shaunlusk.GfxElement} Returns this element if it needs to be redrawn, null otherwise.
*/
shaunlusk.GfxElement.prototype.update = function(time,diff) {
  this._updateLocationFromMoveRates(time,diff);
  // Will take precedence over move rate
  this._updateMoveOrder(time,diff);

  if (this.getX() !== this.getLastX() || this.getY() !== this.getLastY()) {
    this.setDirty(true);
    this.notify(
      new shaunlusk.Event(
        shaunlusk.EventType.ELEMENT_MOVED,
        {element:this},
        time
      )
    );
  }

  if (this.isDirty()) {
    return this;
  }
  return null;
};

/** Updates the elements position using movement rates and the time diff.
* @private
* @param {number} time
* @param {number} diff
*/
shaunlusk.GfxElement.prototype._updateLocationFromMoveRates = function(time, diff) {
  var amount,sign,intAmount;

  if (this._xMoveRate !== 0) {
    amount = this._xMoveFractionalAccumulator + diff * this._xMoveRate / 1000;
    sign = Math.sign(amount);
    intAmount = Math.trunc(amount);
    this._xMoveFractionalAccumulator = sign * (Math.abs(amount) - Math.abs(intAmount));
    this._x += intAmount;
    if (this._x !== this._lastX) this.setDirty(true);
  } else {
    this._xMoveFractionalAccumulator = 0;
  }
  if (this._yMoveRate !== 0) {
    amount = this._yMoveFractionalAccumulator + diff * this._yMoveRate / 1000;
    sign = Math.sign(amount);
    intAmount = Math.trunc(amount);
    this._yMoveFractionalAccumulator = sign * (Math.abs(amount) - Math.abs(intAmount));
    this._y += intAmount;
    if (this._y !== this._lastY) this.setDirty(true);
  } else {
    this._yMoveFractionalAccumulator = 0;
  }
};

/** Updates the elements position based on the current moveTo instruction.
* @private
* @param {number} time
* @param {number} diff
*/
shaunlusk.GfxElement.prototype._updateMoveOrder = function(time,diff) {
  if (this._currentMove !== null) {
    this._currentMove.update(time,diff);
    this.setDirty(true);
  }
};

/** Clears this element's bounding box. Time parameters are not used, just made available here for extension.
* @param {number} time
* @param {number} diff
*/
shaunlusk.GfxElement.prototype.clear = function(time, diff) {
  this.getCanvasContext().clearRect(
    this.getLastX() * this.getScreenScaleX() - 1,
    this.getLastY() * this.getScreenScaleY() - 1,
    this.getWidth() * this.getTotalScaleX() + 2,
    this.getHeight() * this.getTotalScaleY() + 2 );
};

/**
* GfxElement does not actually render anything, it only provides post-render clean up.
* The render method should be implemented in subclasses, which should call this base method when done.
* Time parameters provided for extension.
* @param {number} time
* @param {number} diff
*/
shaunlusk.GfxElement.prototype.render = function(time, diff) {
  this.setLastX( this.getX() );
  this.setLastY( this.getY() );
  this.setDirty(false);
  this._hadCollisionPreviousFrame = this.hasCollision();
  this.setHasCollision(false);
};

/** Check whether this element collidesWith another element.
* Compares the boundaries of this element and the other to check for overlap; if so return true, else return false.
* @param {shaunlusk.GfxElement} element
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.collidesWith = function(element) {
  var thisX = this.getCollisionBoxX();
  var thatX = element.getCollisionBoxX();
  var thisWidth = this.getCollisionBoxWidth();
  var thatWidth = element.getCollisionBoxWidth();
  var thisY = this.getCollisionBoxY();
  var thatY = element.getCollisionBoxY();
  var thisHeight = this.getCollisionBoxHeight();
  var thatHeight = element.getCollisionBoxHeight();
  var result = thisX < thatX + thatWidth &&
    thisX + thisWidth > thatX &&
    thisY < thatY + thatHeight &&
    thisY + thisHeight > thatY;
  /* Internally, we may need to redraw if one of the elements was recently hidden.
  * However, don't trigger the event if either element is hidden.
  */
  if (result && !this.isHidden() && !element.isHidden()) {
    this.notify(
      new shaunlusk.Event(shaunlusk.EventType.ELEMENT_COLLISION, {
        element1 : this,
        element2 : element
      })
    );
    // notify the other element of the collision
    element.notify(
      new shaunlusk.Event(shaunlusk.EventType.ELEMENT_COLLISION, {
        element1 : element,
        element2 : this
      })
    );
  }
  return result;
};

/** Check whether this element intersects a specific point on the screen.
* @param {number} x
* @param {number} y
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.collidesWithCoordinates = function(x, y) {
  var result = x >= this.getCollisionBoxX() &&
    x <= this.getCollisionBoxX() + this.getCollisionBoxWidth() &&
    y >= this.getCollisionBoxY() &&
      y <= this.getCollisionBoxY() + this.getCollisionBoxHeight();
  return result;
};

/** Check whether this element intersects an x coordinate.
* @param {number} x
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.collidesWithX = function(x) {
  var result = x >= this.getCollisionBoxX() &&
    x <= this.getCollisionBoxX() + this.getCollisionBoxWidth();
  return result;
};

/** Check whether this element intersects an y coordinate.
* @param {number} x
* @return {boolean}
*/
shaunlusk.GfxElement.prototype.collidesWithY = function(y) {
  var result = y >= this.getCollisionBoxY() &&
      y <= this.getCollisionBoxY() + this.getCollisionBoxHeight();
  return result;
};

/** Returns the x value of the collision box.  Incorporates screen scale.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getCollisionBoxX = function() {return this.getX() * this.getScreenScaleX() - 1;};

/** Returns the y value of the collision box.  Incorporates screen scale.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getCollisionBoxY = function() {return this.getY() * this.getScreenScaleY() - 1;};

/** Returns the width value of the collision box.  Incorporates total scale.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getCollisionBoxWidth = function() {return this.getWidth() * this.getTotalScaleX() + 2;};

/** Returns the height value of the collision box.  Incorporates total scale.
* @return {number}
*/
shaunlusk.GfxElement.prototype.getCollisionBoxHeight = function() {return this.getHeight() * this.getTotalScaleY() + 2;};

/** Fires events if the mouse event is on this element.<br />
* Events emitted:
* <ul>
*   <li>{@link shaunlusk.EventType.MOUSE_ENTER_ELEMENT}</li>
*   <li>{@link shaunlusk.EventType.MOUSE_EXIT_ELEMENT}</li>
*   <li>{@link shaunlusk.EventType.MOUSE_MOVE_OVER_ELEMENT}</li>
*   <li>{@link shaunlusk.EventType.MOUSE_DOWN_ON_ELEMENT}</li>
*   <li>{@link shaunlusk.EventType.MOUSE_UP_ON_ELEMENT}</li>
* </ul>
* For these events, data is as follows:
*   <ul>
*     <li>x : mouse event x value</li>
*     <li>y : mouse event y value</li>
*     <li>row : mouse event row value</li>
*     <li>col : mouse event col value</li>
*     <li>element : this element</li>
*   </ul>
* @param {shaunlusk.Event}
*/
shaunlusk.GfxElement.prototype.handleMouseEvent = function(event) {
  if (this.collidesWithCoordinates(event.data.x, event.data.y)) {
    if (!this.isMouseOver()) {
      this.notify(new shaunlusk.Event(
        shaunlusk.EventType.MOUSE_ENTER_ELEMENT,
        {
          x : event.data.x,
          y : event.data.y,
          row : event.data.row,
          col : event.data.col,
          element : this
        },
        event.data.time
      ));
    }

    this._mouseIsOver = true;
    var type = null;
    switch(event.type) {
      case shaunlusk.EventType.MOUSE_MOVE:
        type = shaunlusk.EventType.MOUSE_MOVE_OVER_ELEMENT;
        break;
      case shaunlusk.EventType.MOUSE_DOWN:
        type = shaunlusk.EventType.MOUSE_DOWN_ON_ELEMENT;
        break;
      case shaunlusk.EventType.MOUSE_UP:
        type = shaunlusk.EventType.MOUSE_UP_ON_ELEMENT;
        break;
    }
    var thisevent = new shaunlusk.Event(
      type,
      {
        x : event.data.x,
        y : event.data.y,
        row : event.data.row,
        col : event.data.col,
        element : this
      },
      event.data.time
    );
    this.notify(thisevent);
  } else {
    if (this.isMouseOver()) {
      this.notify(new shaunlusk.Event(
        shaunlusk.EventType.MOUSE_EXIT_ELEMENT,
        {
          x : event.data.x,
          y : event.data.y,
          row : event.data.row,
          col : event.data.col,
          element : this
        },
        event.data.time
      ));
      this._mouseIsOver = false;
    }
  }
};
