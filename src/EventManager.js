var EventNotifierMixin = require("./EventNotifierMixin");

/**
* Tracks event handlers and notifies them when events occur.
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
