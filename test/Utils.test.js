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
  describe("#linSearch", function() {
    var equalityFunction = function(a, b) {return a === b;};
    it("should return index when value is found", function(done) {
      var a = [1, 2, 3, 4, 5];
      var target = 4;
      var expected = 3;

      var result = SL.linSearch(a, target, equalityFunction);

      assert(result === expected, "should have returned index value " + expected);
      done();
    });
    it("should return -1 when value is not found", function(done) {
      var a = [1, 2, 3, 4, 5];
      var target = 14;
      var expected = -1;

      var result = SL.linSearch(a, target, equalityFunction);

      assert(result === expected, "should have returned " + expected);
      done();
    });
  });
  describe("#isNullOrUndefined", function() {
    it("should return true when value is null", function(done) {
      var value = null;
      var expected = true;

      var result = SL.isNullOrUndefined(value);

      assert(result === expected, "should have returned " + expected);
      done();
    });
    it("should return true when value is undefined", function(done) {
      var expected = true;

      var result = SL.isNullOrUndefined();

      assert(result === expected, "should have returned " + expected);
      done();
    });
    it("should return false when value is not null", function(done) {
      var value = {};
      var expected = false;

      var result = SL.isNullOrUndefined(value);

      assert(result === expected, "should have returned " + expected);
      done();
    });
  });
  describe("#degreesToRadians", function() {
    it("should convert degrees To Radians", function(done) {
      var degrees = 125;
      var expected = 2.182;

      var result = SL.degreesToRadians(degrees);
      result = Math.round(result * 1000, 3);
      result /= 1000;

      assert(result === expected, "should have returned " + expected + "; actual " + result);
      done();
    });
  });
  describe("#checkCollision", function() {
    it("should return true when boxes overlap", function(done) {
      var x1 = 0;
      var y1 = 0;
      var width1 = 10;
      var height1 = 10;
      var x2 = 5;
      var y2 = 5;
      var width2 = 10;
      var height2 = 10;
      var expected = true;

      var result = SL.checkCollision(x1, y1, width1, height1, x2, y2, width2, height2);

      assert(result === expected, "should have returned " + expected);
      done();
    });
    it("should return false when boxes do not overlap", function(done) {
      var x1 = 0;
      var y1 = 0;
      var width1 = 10;
      var height1 = 10;
      var x2 = 50;
      var y2 = 50;
      var width2 = 10;
      var height2 = 10;
      var expected = false;

      var result = SL.checkCollision(x1, y1, width1, height1, x2, y2, width2, height2);

      assert(result === expected, "should have returned " + expected);
      done();
    });
    it("should return false when boxes touch", function(done) {
      var x1 = 0;
      var y1 = 0;
      var width1 = 10;
      var height1 = 10;
      var x2 = 10;
      var y2 = 10;
      var width2 = 10;
      var height2 = 10;
      var expected = false;

      var result = SL.checkCollision(x1, y1, width1, height1, x2, y2, width2, height2);

      assert(result === expected, "should have returned " + expected);
      done();
    });
  });
});
