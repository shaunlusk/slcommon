import { IComparable, PriorityQueue } from '../src/PriorityQueue';

class NumberComparable implements IComparable<NumberComparable> {
  constructor(private n: number) {}
  compareTo(other: NumberComparable): number {return this.n > other.n ? 1 : (this.n < other.n ? -1 : 0);}
  equals (other: NumberComparable): boolean {return this.n === other.n;}
  get value() { return this.n }
  set value(val: number) { this.n = val; }
}

describe("PriorityQueue",function(){
  describe("push pop", function() {
    it("should pop in ascending order", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      const popCount = 0;
      expect(q.pop().value).toBe(10);
      expect(q.pop().value).toBe(20);
      expect(q.pop().value).toBe(30);
      expect(q.pop().value).toBe(40);
      expect(q.pop().value).toBe(50);
      expect(q.pop().value).toBe(60);
      expect(q.pop().value).toBe(70);

      done();
    });
    it("should pop in descending order when invertPriority is set.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.setInvertPriority(true);
      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      const popCount = 0;
      expect(q.pop().value).toBe(70);
      expect(q.pop().value).toBe(60);
      expect(q.pop().value).toBe(50);
      expect(q.pop().value).toBe(40);
      expect(q.pop().value).toBe(30);
      expect(q.pop().value).toBe(20);
      expect(q.pop().value).toBe(10);

      done();
    });
    it("should return null when queue is empty.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      expect(q.pop()).toBe(null);
      done();
    });
  });
  describe("#setInvertPriority()", function(){
    it("should reorder queue descending when set true.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(3) );
      q.setInvertPriority(true);
      const e = q.peek();
      expect(e.value).toBe(3);
      done();
    });
    it("should reorder queue ascending when set false.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.setInvertPriority(true);
      q.push( getPriorityQueueElement(3) );
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(1) );

      q.setInvertPriority(false);
      const e = q.peek();
      expect(e.value).toBe(1);
      done();
    });
  });
  describe("#updateElement()", function() {
    it("it should increase the priority of the element", function(done) {
      const q = new PriorityQueue<NumberComparable>();

      const a = getPriorityQueueElement(3);
      q.push( getPriorityQueueElement(2) );
      q.push( a );
      q.push( getPriorityQueueElement(5) );

      expect(q.peek().value).toBe(2);

      a.value = 1;
      q.updateElement(a);

      expect(q.peek().value).toBe(1);

      done();
    });
    it("it should decrease the priority of the element", function(done) {
      const q = new PriorityQueue<NumberComparable>();

      const a = getPriorityQueueElement(3);
      q.push( getPriorityQueueElement(2) );
      q.push( a );
      q.push( getPriorityQueueElement(5) );

      expect(q.peek().value).toBe(2);

      a.value = 6;
      q.updateElement(a);

      q.pop();
      q.pop();

      expect(q.pop().value).toBe(6);

      done();
    });
    it("it should increase the priority of the element, inverted priority", function(done) {
      const q = new PriorityQueue<NumberComparable>();
      q.setInvertPriority(true);

      const a = getPriorityQueueElement(3);
      q.push( getPriorityQueueElement(2) );
      q.push( a );
      q.push( getPriorityQueueElement(5) );

      expect(q.peek().value).toBe(5);

      a.value = 6;
      q.updateElement(a);

      expect(q.peek().value).toBe(6);

      done();
    });
    it("it should decrease the priority of the element, inverted priority", function(done) {
      const q = new PriorityQueue<NumberComparable>();
      q.setInvertPriority(true);

      const a = getPriorityQueueElement(3);
      q.push( getPriorityQueueElement(2) );
      q.push( a );
      q.push( getPriorityQueueElement(5) );

      expect(q.peek().value).toBe(5);

      a.value = 1;
      q.updateElement(a);
      q.pop();
      q.pop();

      expect(q.peek().value).toBe(1);

      done();
    });
  });
  describe('#toSortedArray', () => {
    it('should return a sorted array', done => {
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(3) );

      const result = q.toSortedArray();

      expect(result[0].value).toBe(1);
      expect(result[1].value).toBe(2);
      expect(result[2].value).toBe(3);
      done();
    });
    it('should return a sorted array, inverted priority', done => {
      const q = new PriorityQueue<NumberComparable>();
      q.invertPriority = true;
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(3) );

      const result = q.toSortedArray();

      expect(result[0].value).toBe(3);
      expect(result[1].value).toBe(2);
      expect(result[2].value).toBe(1);
      done();
    });
    it('should return a sorted array after priority changes', done => {
      const q = new PriorityQueue<NumberComparable>();
      const element = getPriorityQueueElement(2);
      q.push( element );
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(3) );

      element.value = 5;
      q.updateElement(element);

      q.push( getPriorityQueueElement(4) );

      const result = q.toSortedArray();

      expect(result[0].value).toBe(1);
      expect(result[1].value).toBe(3);
      expect(result[2].value).toBe(4);
      expect(result[3].value).toBe(5);
      done();
    });
    it('should return a sorted array after priority changes, inverted priority', done => {
      const q = new PriorityQueue<NumberComparable>();
      q.invertPriority = true;
      const element = getPriorityQueueElement(2);
      q.push( element );
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(3) );

      element.value = 5;
      q.updateElement(element);

      q.push( getPriorityQueueElement(2) );

      const result = q.toSortedArray();

      expect(result[0].value).toBe(5);
      expect(result[1].value).toBe(4);
      expect(result[2].value).toBe(3);
      expect(result[3].value).toBe(2);
      expect(result[4].value).toBe(1);
      done();
    });
  });

  describe("#getByIndex()", function() {
    it("should return the element at the specified index.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(3) );

      const e = q.getByIndex(1);

      expect(e.value).toBe(2 );
      done();
    });
    it("should throw exception when index is out of bounds", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(3) );

      expect(() => q.getByIndex(4)).toThrow();

      done();
    });
    it("should throw exception when index is < 0", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(3) );

      expect(() => q.getByIndex(-1)).toThrow();
      done();
    });
  });
  describe("#filter()", function() {
    it("should return the element when it is found", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      const e = getPriorityQueueElement(3);
      q.push( e );
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(5) );

      const f = q.filter(el => el.value === e.value);

      expect(f[0].value).toBe(e.value);
      done();
    });
    it("should return empty array when element is not found", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      const e = getPriorityQueueElement(3);
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(5) );

      const f = q.filter(el => el.value === e.value);

      expect(f.length).toBe(0);
      done();
    });
    it("should return multiple elements", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(5) );

      const f = q.filter(el => el.value === 4);

      expect(f.length).toBe(2);
      done();
    });
  });
  describe("#contains()", function() {
    it("should return true when the element is found", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      const e = getPriorityQueueElement(3);
      q.push( e );
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(5) );

      const f = q.contains(e);

      expect(f).toBe(true );
      done();
    });
    it("should return false when the element is not found", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      const e = getPriorityQueueElement(3);
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(5) );

      const f = q.contains(e);

      expect(f).toBe(false );
      done();
    });
  });
  describe("#remove()", function() {
    it("should remove the specified element.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      const e = getPriorityQueueElement(3);
      q.push( e );
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(5) );

      q.remove(e);
      const f = q.contains(e);

      expect(f).toBe(false );
      expect(4).toBe(q.size() );
      done();
    });
    it("should do nothing if the specified element is not found.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(1) );
      q.push( getPriorityQueueElement(2) );
      const e = getPriorityQueueElement(3);
      q.push( getPriorityQueueElement(4) );
      q.push( getPriorityQueueElement(5) );
      const size = q.size();
      q.remove(e);
      const f = q.contains(e);

      expect(f).toBe(false );
      expect(size).toBe(q.size() );
      done();
    });
    it("should do nothing no elements in queue.", function(done){
      const q = new PriorityQueue<NumberComparable>();
      const e = getPriorityQueueElement(3);
      const size = q.size();
      q.remove(e);

      expect(size).toBe(q.size() );
      done();
    });
  });
  describe("#clear()", function() {
    it("should set heap size to 0", function(done) {
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      q.clear();

      expect(q.size()).toBe(0);

      done();
    });
    it("after clear, peek should return null", function(done) {
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      q.clear();

      expect(q.peek()).toBe(null);

      done();
    });
    it("after clear, pop should return null", function(done) {
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      q.clear();

      expect(q.pop()).toBe(null);

      done();
    });
    it("after clear, then push, size should be 1, peek should return newly added element", function(done) {
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      q.clear();
      q.push( getPriorityQueueElement(5) );

      expect(q.size()).toBe(1);

      done();
    });
    it("after clear, multiple pushes should be ordered properly", function(done) {
      const q = new PriorityQueue<NumberComparable>();
      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      q.clear();

      q.push( getPriorityQueueElement(50) );
      q.push( getPriorityQueueElement(20) );
      q.push( getPriorityQueueElement(10) );
      q.push( getPriorityQueueElement(70) );
      q.push( getPriorityQueueElement(30) );
      q.push( getPriorityQueueElement(40) );
      q.push( getPriorityQueueElement(60) );

      const popCount = 0;
      expect(q.pop().value).toBe(10);
      expect(q.pop().value).toBe(20);
      expect(q.pop().value).toBe(30);
      expect(q.pop().value).toBe(40);
      expect(q.pop().value).toBe(50);
      expect(q.pop().value).toBe(60);
      expect(q.pop().value).toBe(70);

      done();
    });
  });
});

function getPriorityQueueElement(val: number) {
  return new NumberComparable(val);
}

