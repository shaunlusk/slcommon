import { IKeyedComparable } from '../src/IKeyedComparable';
import { UniquePriorityQueue } from '../src/UniquePriorityQueue';

class TestKeyedComparable implements IKeyedComparable<TestKeyedComparable> {
  constructor(public key: string, public value: number) {}
  getKey() { return this.key; };
  compareTo(other: TestKeyedComparable): number {return this.value > other.value ? 1 : (this.value < other.value ? -1 : 0);}
  equals (other: TestKeyedComparable): boolean {return this.value === other.value;}
}

describe("UniquePriorityQueue", function() {
  let q: UniquePriorityQueue<TestKeyedComparable>; 
  let element1: TestKeyedComparable, element2: TestKeyedComparable, element3: TestKeyedComparable;
  beforeEach(function() {
    element1 = new TestKeyedComparable('key1', 0);
    element2 = new TestKeyedComparable('key2', 1);
    element3 = new TestKeyedComparable('key3', 1);
    q = new UniquePriorityQueue();
  });
  describe("#insert()", function() {
    it("should add element to queue", function(done) {
      q.insert(element1);

      expect(q.size()).toBe(1);
      done();
    });
    it("should add element to queue", function(done) {
      q.insert(element1);
      q.insert(element2);

      expect(q.size()).toBe(2);
      done();
    });
    it("should not add non-unique element to queue", function(done) {
      q.insert(element1);
      q.insert(element1);

      expect(q.size()).toBe(1);
      done();
    });
  });
  describe("#clear()", function() {
    it("should clear", function(done) {
      q.insert(element1);
      q.insert(element2);

      q.clear();
      expect(q.size()).toBe(0);

      q.insert(element1);
      expect(q.size()).toBe(1);
      done();
    });
  });
  describe("#extractMax()", function() {
    it("should remove max element", function(done) {
      q.insert(element1);
      q.insert(element2);

      const result = q.extractMax();

      expect(q.size()).toBe(1);
      expect(result.getKey()).toBe("key1");

      q.insert(element1);
      expect(q.size()).toBe(2);

      done();
    });
    it("should do nothing with empty queue", function(done) {
      const result = q.extractMax();

      expect(q.size()).toBe(0);
      expect(result).toBe(null);

      done();
    });
  });
  describe("#contains()", function() {
    it("should return true", function(done) {
      q.insert(element1);

      const result = q.contains(element1);

      expect(result).toBe(true);
      done();
    });
    it("should return false", function(done) {
      q.insert(element1);

      const result = q.contains(element2);

      expect(result).toBe(false);
      done();
    });
  });
  describe("#remove()", function() {
    it("should remove element", function(done) {
      q.insert(element1);

      q.remove(element1);

      expect(q.contains(element1)).toBe(false);
      done();
    });
    it("should do nothing if element not in queue", function(done) {
      q.insert(element2);

      q.remove(element1);

      expect(q.size()).toBe(1);
      done();
    });
  });
});
