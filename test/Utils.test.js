describe("Utils", function() {
  describe("#isFunction", function() {
    it("should return true", function(done) {
      var fn = function() {};

      var result = SL.isFunction(fn);

      assert(result === true, "should have returned true;");
      done();
    });
    it("should return false", function(done) {
      var fn = "not a function";

      var result = SL.isFunction(fn);

      assert(result === false, "should have returned false;");
      done();
    });
  });
});
