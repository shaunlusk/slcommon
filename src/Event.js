/**
* SL Event.
* @constructor
* @param {string} type The type of the event.
* @param {Object} data Data for the event.  Determined by event emitter
* @param {time} time Optional.  The time the event occurred. If not specified, uses Date.now()
*/
export default function Event(type, data, time) {
  this.type = type;
  this.data = data;
  this.time = time || Date.now();
};
