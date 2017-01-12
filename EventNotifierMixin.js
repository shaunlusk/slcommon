var shaunlusk = shaunlusk || {};

/** Add Event Notification functions to a class.
* Tracks event handlers and notifies them when events occur.
* @mixin
*/
shaunlusk.EventNotifierMixin = function(props) {

  /** Add an event handler to the screen.
  * @param {shaunlusk.EventType} eventType The type of the event.
  * @param {Function} callback The handler to call when the specified event type occurs
  */
  this.on = function(eventType, callback) {
    if (!this._eventListeners[eventType]) {
      this._eventListeners[eventType] = [];
    }
    this._eventListeners[eventType].push(callback);
  };

  /** Clear all event handlers for a given event type.
  * @param {shaunlusk.EventType} eventType The type of the event.
  */
  this.clearEventHandlers = function(eventType) {
    if (!this._eventListeners[eventType]) {
      throw new Error("Unknown event type:" + eventType);
    }
    this._eventListeners[eventType] = [];
  };

  /** Notify event handlers when an event has occured.
  * @param {shaunlusk.Event} event The event that occured
  */
  this.notify = function(event) {
    if (!this._eventListeners[event.type]) {
      throw new Error("Unknown event type:" + event.type);
    }
    for (var i = 0; i < this._eventListeners[event.type].length; i++) {
      if (shaunlusk.isFunction(this._eventListeners[event.type][i])) this._eventListeners[event.type][i](event);
    }
  };

  if (!this.mixinInitializers) {this.mixinInitializers = [];}
  this.mixinInitializers.push(function(props) {
    this._eventListeners  =  {};
  }.bind(this));
};
