/** Create an Event.
* @class
* @param {string} type The type of the event.
* @param {Object} data Data for the event.  Determined by event emitter
* @param {time} time Optional.  The time the event occurred. If not specified, uses Date.now()
*/
export class Event {
    constructor(type: string, data: any, time?: number) {
        /** @member {string} */
        this.type = type;
        /** @member {Object} */
        this.data = data;
        /** @member {time} */
        this.time = time || Date.now();
    }

    public readonly type: string;
    public readonly data: any;
    public readonly time: number;
};
