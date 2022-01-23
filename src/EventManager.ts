import { Event } from './Event';

/** 
* Tracks event listeners and notifies them when events occur.
* @class
*/
export class EventManager {
  private static EventManagerId = 0;
  private _eventManagerId = EventManager.EventManagerId++;
  private _eventManagerListenerId = 0;
  private _eventListeners: {[key: string]: {[key: string]: (ev: Event) => any} } = {};

  /** Add an event listener to the listener list.
  * @param {EventType} eventType The type of the event.
  * @param {Function} callback The listener to call when the specified event type occurs
  * @param {string} id Optional. An Id to reference the listener by.
  * @return {string} The id to reference the listener by.  For use in removing the listener.  If not explicitly provided a listener Id will be generated.
  */
  public addEventListener(eventType: string, callback: (ev: Event) => any, id?: string): string {
    const listenerId = id || "eventListener_" + this._eventManagerId + "." + this._eventManagerListenerId;
    this._eventManagerListenerId++;
    if (!this._eventListeners[eventType]) {
      this.registerEventType(eventType);
    }
    this._eventListeners[eventType][listenerId] = callback;
    return listenerId;
  };

  /** Register an event type.
  * @private
  */
  private registerEventType(eventType: string): void {
    this._eventListeners[eventType] = this._eventListeners[eventType] || {};
  };

  /** Alias for 'add'. Add an event listener to the listener list.
  * @param {EventType} eventType The type of the event.
  * @param {Function} callback The listener to call when the specified event type occurs
  * @param {string} id Optional. An Id to reference the listener by.
  */
  on = this.addEventListener;

  /** Remove an event listener.
  * @param {string} eventListenerId The id of the listener to remove.
  */
  public removeEventListener(eventListenerId: string): void {
    // delete
    Object.keys(this._eventListeners).forEach(listenerKey => {
      if (this._eventListeners[listenerKey][eventListenerId]) delete this._eventListeners[listenerKey][eventListenerId];
    });
  };

  /** Clear all event listeners for a given event type.
  * @param {EventType} eventType The type of the event.
  */
  public clearEventListeners(eventType: string): void {
    this._eventListeners[eventType] = {};
  };

  public notify(event: Event): void;
  public notify(eventType: string, data?: any, time?: number): void;
  /** Notify event listeners when an event has occured.
   * Overloads:
   * <ul>
   * <li>notify(anEvent);</li>
   * <li>notify(eventType, someDate, eventTime);</li>
   * </ul>
  * @param {(Event|string)} eventOrEventType The event that occured, or the type of event.
  * @param {Object} [data] The data associated with the event, if the first argument is the event type.
  * @param {time} [time] The time of the event, if the first argument is the event type.
  */
  public notify(eventOrEventType: Event|string, data?: any, time?: number): void {
    let event = null;
    if (eventOrEventType instanceof Event) {
      event = eventOrEventType;
    } else {
      event = new Event(eventOrEventType, data, time);
    }

    if (!this._eventListeners[event.type]) {
      return;
    }

    for (const key in this._eventListeners[event.type]) {
      this._eventListeners[event.type][key](event);
    }
  };
}

export interface IEventManager {
    addEventListener(eventType: string, callback: (ev: Event) => any, id: string): string;
    removeEventListener(eventListenerId: string): void;
    clearEventListeners(eventType: string): void;
    notify(event: Event): void;
    notify(eventType: string, data?: any, time?: number): void;
    notify(eventOrEventType: Event|string, data?: any, time?: number): void;
}