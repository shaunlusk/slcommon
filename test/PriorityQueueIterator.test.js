describe("PriorityQueueIterator", function() {
  describe("#constructor", function() {
    it("should construct from PriorityQueue", function(done) {
      var pq = new SL.PriorityQueue();
      var it = pq.newIterator();
      assert(it !== null, "should have instantiated PriorityQueueIterator");
      assert(it instanceof SL.PriorityQueueIterator, "did not create the expected type");
      done();
    });
    it("should construct from UniquePriorityQueue", function(done) {
      var pq = new SL.UniquePriorityQueue();
      var it = pq.newIterator();
      assert(it !== null, "should have instantiated PriorityQueueIterator");
      assert(it instanceof SL.PriorityQueueIterator, "did not create the expected type");
      done();
    });
  });
  describe("From PriorityQueue", function() {
    var pq = new SL.PriorityQueue();
    [10, 20, 30].forEach(function(item) {
      var elem = getPriorityQueueElement(item);
      elem.getKey = function() {return item.toString();};
      pq.insert( elem );
    });
    describe("#getCurrent", function() {
      it("should return the current element", function(done) {
        var it = pq.newIterator();
        var expected = 10;

        var result = it.getCurrent().value;

        assert(result === expected, "should have returned " + expected + " (actual: " + result + ")");
        done();
      });
      it("should return the current element, after getting next", function(done) {
        var it = pq.newIterator();
        it.next();
        var expected = 20;

        var result = it.getCurrent().value;

        assert(result === expected, "should have returned " + expected + " (actual: " + result + ")");
        done();
      });
      it("should return null", function(done) {
        var it = pq.newIterator();
        it.next();
        it.next();
        it.next();
        var expected = null;

        var result = it.getCurrent();

        assert(result === expected, "should have returned " + expected + " (actual: " + result + ")");
        done();
      });
    });
  });
  describe("From UniquePriorityQueue", function() {
    var pq = new SL.UniquePriorityQueue();
    [10, 20, 30].forEach(function(item) {
      var elem = getPriorityQueueElement(item);
      elem.getKey = function() {return item.toString();};
      pq.insert( elem );
    });
    describe("#getCurrent", function() {
      it("should return the current element", function(done) {
        var it = pq.newIterator();
        var expected = 10;

        var result = it.getCurrent().value;

        assert(result === expected, "should have returned " + expected + " (actual: " + result + ")");
        done();
      });
      it("should return the current element, after getting next", function(done) {
        var it = pq.newIterator();
        it.next();
        var expected = 20;

        var result = it.getCurrent().value;

        assert(result === expected, "should have returned " + expected + " (actual: " + result + ")");
        done();
      });
      it("should return null", function(done) {
        var it = pq.newIterator();
        it.next();
        it.next();
        it.next();
        var expected = null;

        var result = it.getCurrent();

        assert(result === expected, "should have returned " + expected + " (actual: " + result + ")");
        done();
      });
    });
  });
});
