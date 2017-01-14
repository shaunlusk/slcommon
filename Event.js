var shaunlusk = shaunlusk || {};

/**
* shaunlusk Event.
* @constructor
* @param {shaunlusk.EventType} type The type of the event. Refer to {@link shaunlusk.EventType}
* @param {Object} data Data for the event.  Determined by event emitter
* @param {time} time Optional.  The time the event occurred. If not specified, uses performance.now()
*/
shaunlusk.Event = function(type, data, time) {
  this.type = type;
  this.data = data;
  this.time = time || performance.now();
};
