var Utils = require("./Utils");

/** Add Event Notification functions to a class.
* Tracks event handlers and notifies them when events occur.
* Usage:
* Call:
*   EventNotifierMixin.call(MyClass.prototype);
* And in your constructor, call initializer with the event types you want to listen for:
*   this.EventNotifierMixinInitializer({
*     eventListeners:[
*       "myEvent1",
*       "myEvent2",
*     ]
*   });
* Then you can add handlers:
*   myClassInstance.on("myEvent1", someHandlerCallback);
* @class
*/
function EventNotifierMixin(props) {
  props = props || {};
  this._eventNotifierMixinId = EventNotifierMixin.id++;
  this._eventNotifierMixinHandlerId = 0;
  this._EventNotifierMixin_debug = props.EventNotifierMixin_debug || false;
  this._eventListeners  =  {};

  /** Add an event handler to the handler list.
  * @param {EventType} eventType The type of the event.
  * @param {Function} callback The handler to call when the specified event type occurs
  * @param {string} id Optional. An Id to reference the handler by.
  * @return {string} The id to reference the handler by.  For use in removing the handler.  If not explicitly provided a handler Id will be generated.
  */
  this.addEventHandler = function(eventType, callback, id) {
    var handlerId = id || "eventHandler_" + this._eventNotifierMixinId + "." + this._eventNotifierMixinHandlerId;
    this._eventNotifierMixinHandlerId++;
    if (!this._eventListeners[eventType]) {
      this.registerEventType(eventType);
    }
    this._eventListeners[eventType][handlerId] = callback;
    return handlerId;
  };

  /** Register an event type.
  * @private
  */
  this.registerEventType = function(eventType) {
    this._eventListeners[eventType] = {};
  };

  /** Alias for 'add'. Add an event handler to the handler list.
  * @param {EventType} eventType The type of the event.
  * @param {Function} callback The handler to call when the specified event type occurs
  * @param {string} id Optional. An Id to reference the handler by.
  */
  this.on = this.addEventHandler;

  /** Remove an event handler.
  * @param {string} eventHandlerId The id of the handler to remove.
  */
  this.removeEventHandler = function(eventHandlerId) {
    // delete
    Object.keys(this._eventListeners).forEach(function(listenerKey) {
      if (this._eventListeners[listenerKey][eventHandlerId]) delete this._eventListeners[listenerKey][eventHandlerId];
    }.bind(this));
  };

  /** Clear all event handlers for a given event type.
  * @param {EventType} eventType The type of the event.
  */
  this.clearEventHandlers = function(eventType) {
    if (!this._eventListeners[eventType] && this._EventNotifierMixin_debug) {
      console.log("Unknown event type:" + eventType);
    }
    this._eventListeners[eventType] = {};
  };

  /** Notify event handlers when an event has occured.
  * @param {Event} event The event that occured
  */
  this.notify = function(event) {
    if (!this._eventListeners[event.type]) {
      if (this._EventNotifierMixin_debug) console.log("Unknown event type:" + event.type);
      return;
    }
    var keys = Object.keys(this._eventListeners[event.type]);
    for (var i = 0; i < keys.length; i++) {
      if (Utils.isFunction(this._eventListeners[event.type][keys[i]])) this._eventListeners[event.type][keys[i]](event);
    }
  };
};

EventNotifierMixin.id = 0;

module.exports = EventNotifierMixin;
