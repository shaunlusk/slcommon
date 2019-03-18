var EventNotifierMixin = require("./EventNotifierMixin");

/**
* Tracks event handlers and notifies them when events occur.
* See {@link EventNotifierMixin} for full documentaiton.
* @class
* @see EventNotifierMixin
*/
function EventManager() {
  this.EventNotifierMixinInitializer({
    eventListeners:[]
  });
};

EventNotifierMixin.call(EventManager.prototype);

module.exports = EventManager;
