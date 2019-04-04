var assert = require("./testUtil").assert;
var throwsError = require("./testUtil").throwsError;
var Event = require("../src/Event");
var EventNotifierMixin = require("../src/EventNotifierMixin");
var Utils = require("../src/Utils");

function TestClass() {}

describe("EventNotifierMixin", function() {
  EventNotifierMixin.call(TestClass.prototype);
  var eventType1 = "testEvent1";
  var eventType2 = "testEvent2";
  describe("Apply Mixin Tests", function() {
    describe("#constructor", function() {
      it("should add addEventHandler method to prototype", function(done) {
        assert(Utils.isFunction(TestClass.prototype.addEventHandler) === true, "should have added addEventHandler method to prototype");
        done();
      });
      it("should add removeEventHandler method to prototype", function(done) {
        assert(Utils.isFunction(TestClass.prototype.removeEventHandler) === true, "should have added removeEventHandler method to prototype");
        done();
      });
      it("should add clearEventHandlers method to prototype", function(done) {
        assert(Utils.isFunction(TestClass.prototype.clearEventHandlers) === true, "should have added clearEventHandlers method to prototype");
        done();
      });
      it("should add notify method to prototype", function(done) {
        assert(Utils.isFunction(TestClass.prototype.notify) === true, "should have added notify method to prototype");
        done();
      });
    });
  });
  describe("Main Tests", function() {
    var testClass;
    var id = "testId";
    beforeEach(function() {
      testClass = new EventNotifierMixin();
    });
    describe("#addEventHandler", function() {
      it("should add handler", function(done) {
        testClass.addEventHandler(eventType1, function (){}, id);

        assert(Utils.isNullOrUndefined(testClass._eventListeners[eventType1][id]) === false, "should have added handler");
        done();
      });
      it("should assign id", function(done) {
        var id = testClass.addEventHandler(eventType1, function (){});

        assert(Utils.isNullOrUndefined(id) === false, "should have assigned id");
        assert(Utils.isNullOrUndefined(testClass._eventListeners[eventType1][id]) === false, "should have added handler");
        done();
      });
      it("should add new event handler type", function(done) {
        var type = "New event handler type";
        var id = testClass.addEventHandler(type, function (){});

        assert(Utils.isNullOrUndefined(id) === false, "should have assigned id");
        assert(Utils.isNullOrUndefined(testClass._eventListeners[type][id]) === false, "should have added handler");
        done();
      });
    });
    describe("#removeEventHandler", function() {
      it("should remove event handler", function(done) {
        var id = testClass.addEventHandler(eventType1, function (){});

        testClass.removeEventHandler(id);
        assert(testClass._eventListeners[eventType1][id] === undefined, "should have removed handler");
        done();
      });
    });
    describe("#clearEventHandlers", function() {
      it("should clear event handlers", function(done) {
        var id = testClass.addEventHandler(eventType1, function (){});

        testClass.clearEventHandlers(eventType1);
        assert(testClass._eventListeners[eventType1][id] === undefined, "should have removed handler");
        done();
      });
      it("should not throw error for unknown event type", function(done) {
        var id = testClass.addEventHandler(eventType1, function (){});
        var type = "bogus event type";

        testClass.clearEventHandlers(type);
        assert(testClass._eventListeners[type][id] === undefined);
        done();
      });
    });
    describe("#notify", function() {
      var notified = {};
      var eventData = {
        stuff:"stuff"
      };
      var time = 101;
      beforeEach(function() {
        notified = {};
        testClass.addEventHandler(eventType1, function (event){
          notified.eventType = event.type;
          notified.stuff = event.data.stuff;
          notified.time = event.time;
        });
      });
      it("should notify event handlers", function(done) {
        testClass.notify(new Event(eventType1, eventData, time));

        assert(notified.eventType === eventType1, "should have notified handler: eventType");
        assert(notified.stuff === eventData.stuff, "should have notified handler: stuff");
        assert(notified.time === time, "should have notified handler: time");
        done();
      });
      it("should no longer throw error if unknown event type", function(done) {
        var result = throwsError(testClass.notify.bind(testClass, new Event("bogus event type", eventData, time)));

        assert(result !== true, "should not have thrown error");
        done();
      });
    });
  });
});
