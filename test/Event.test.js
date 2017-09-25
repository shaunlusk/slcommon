describe("Event", function() {
  describe("#constructor", function() {
    it("should create", function(done) {
      var type = "test";
      var data = {stuff:"stuff"};
      var time = 1000;
      var event = new SL.Event(type, data, time);

      assert(event.type === type, "should have set type");
      assert(event.data.stuff === data.stuff, "should have set data");
      assert(event.time === time, "should have set time");
      done();
    });
    it("should use default time", function(done) {
      var type = "test";
      var data = {stuff:"stuff"};
      var event = new SL.Event(type, data);

      assert(event.type === type, "should have set type");
      assert(event.data.stuff === data.stuff, "should have set data");
      assert(event.time !== undefined, "should have set time");
      assert(event.time !== null, "should have set time");
      done();
    });
  });
});
