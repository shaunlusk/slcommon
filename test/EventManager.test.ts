
import { Event } from "../src/Event";
import { EventManager } from "../src/EventManager";

describe("EventManager", function() {
  const eventType1 = "testEvent1";
  const eventType2 = "testEvent2";

  describe("Main Tests", function() {
    let eventManager: EventManager;
    const id = "testId";
    beforeEach(function() {
      eventManager = new EventManager();
    });
    describe("#addEventListener", function() {
      it("should notify", function(done) {
        let counter = 0;
        eventManager.addEventListener(eventType1, _ => {counter++;});
        eventManager.notify(eventType1, {});
        
        expect(counter).toBe(1);
        done();
      });
      it("should not notify", function(done) {
        let counter = 0;
        eventManager.addEventListener(eventType1, _ => {counter++;});
        eventManager.notify(eventType2, {});
        
        expect(counter).toBe(0);
        done();
      });
      it("should assign id", function(done) {
        const id = eventManager.addEventListener(eventType1, () =>{});

        expect(id).toBeTruthy();
        done();
      });
    });
    describe("#removeEventHandler", function() {
      it("should remove event handler", function(done) {
        let counter = 0;
        const id = eventManager.addEventListener(eventType1,  _ => {counter++;});
        eventManager.removeEventListener(id);
        eventManager.notify(eventType1, {});
        
        expect(counter).toBe(0);
        done();
      });
    });
    describe("#clearEventHandlers", function() {
      it("should clear event handlers", function(done) {
        let counter = 0;
        const id = eventManager.addEventListener(eventType1,  _ => {counter++;});
        eventManager.clearEventListeners(eventType1);
        eventManager.notify(eventType1, {});
        
        expect(counter).toBe(0);
        done();
      });
    });
    describe("#notify", function() {
      let notified: {[key: string]: any};
      const eventData = {
        stuff:"stuff"
      };
      const time = 101;
      beforeEach(function() {
        notified = {};
        eventManager.addEventListener(eventType1, event => {
          notified.eventType = event.type;
          notified.stuff = event.data.stuff;
          notified.time = event.time;
        });
      });
      it("should notify event handlers when event is provided", function(done) {
        eventManager.notify(new Event(eventType1, eventData, time));
        expect(notified.eventType).toBe(eventType1);
        expect(notified.stuff).toBe(eventData.stuff);
        expect(notified.time).toBe(time);
        done();
      });
      it("should notify event handlers", function(done) {
        eventManager.notify(eventType1, eventData, time);
        expect(notified.eventType).toBe(eventType1);
        expect(notified.stuff).toBe(eventData.stuff);
        expect(notified.time).toBe(time);
        done();
      });
    });
  });
});
