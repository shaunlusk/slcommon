var SL = SL || {};

/**
* Tracks event handlers and notifies them when events occur.
* @see SL.EventNotifierMixin
* @class
*/
SL.EventManager = function() {
  this.EventNotifierMixinInitializer({
    eventListeners:[]
  });
};

SL.EventNotifierMixin.call(SL.EventManager.prototype);
