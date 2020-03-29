/** Create an Event.
* @class
* @param {string} type The type of the event.
* @param {Object} data Data for the event.  Determined by event emitter
* @param {time} time Optional.  The time the event occurred. If not specified, uses Date.now()
*/
function Event (type, data, time) {
    /** @member {string} */
    this.type = type;
    /** @member {Object} */
    this.data = data;
    /** @member {time} */
    this.time = time || Date.now();
};

module.exports = Event;
