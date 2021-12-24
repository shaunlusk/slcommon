import { Utils } from '../src/Utils';

describe("Utils", function() {
  describe("#isFunction", function() {
    it("should return true", function(done) {
      const fn = function() {};

      const result = Utils.isFunction(fn);

      expect(result).toBeTruthy();
      done();
    });
    it("should return false", function(done) {
      const fn = "not a function";

      const result = Utils.isFunction(fn);

      expect(result).toBeFalsy();
      done();
    });
  });
  describe("#isNullOrUndefined", function() {
    it("should return true when value is null", function(done) {
      let value;

      const result = Utils.isNullOrUndefined(value);

      expect(result).toBeTruthy();
      done();
    });
    it("should return true when value is undefined", function(done) {
      const expected = true;

      const result = Utils.isNullOrUndefined();

      expect(result).toBeTruthy();
      done();
    });
    it("should return false when value is not null", function(done) {
      const value = {};

      const result = Utils.isNullOrUndefined(value);

      expect(result).toBeFalsy();
      done();
    });
  });
  describe("#degreesToRadians", function() {
    it("should convert degrees To Radians", function(done) {
      const degrees = 125;
      const expected = 2.182;

      const result = Utils.degreesToRadians(degrees);

      expect(result).toBeCloseTo(expected, 3);
      done();
    });
  });
  describe("#checkCollision", function() {
    it("should return true when boxes overlap", function(done) {
      const x1 = 0;
      const y1 = 0;
      const width1 = 10;
      const height1 = 10;
      const x2 = 5;
      const y2 = 5;
      const width2 = 10;
      const height2 = 10;

      const result = Utils.checkCollision(x1, y1, width1, height1, x2, y2, width2, height2);

      expect(result).toBeTruthy();
      done();
    });
    it("should return false when boxes do not overlap", function(done) {
      const x1 = 0;
      const y1 = 0;
      const width1 = 10;
      const height1 = 10;
      const x2 = 50;
      const y2 = 50;
      const width2 = 10;
      const height2 = 10;

      const result = Utils.checkCollision(x1, y1, width1, height1, x2, y2, width2, height2);

      expect(result).toBeFalsy();
      done();
    });
    it("should return false when boxes touch", function(done) {
      const x1 = 0;
      const y1 = 0;
      const width1 = 10;
      const height1 = 10;
      const x2 = 10;
      const y2 = 10;
      const width2 = 10;
      const height2 = 10;

      const result = Utils.checkCollision(x1, y1, width1, height1, x2, y2, width2, height2);

      expect(result).toBeFalsy();
      done();
    });
  });
});
