var Utils = require('./Utils');

/** Simple Queue class
* @constructor
*/
var Queue = function() {
  this.head = null;
  this.tail = null;
  this._size = 0;
};

/** Adds a new item to the queue.
* @param {Object} elem The item to be added to the queue.
*/
Queue.prototype.push = function(elem) {
  var qelem = new QueueElement(elem,null);
  if (this._size === 0) {
    this.head = qelem;
  } else {
    this.tail.next = qelem;
  }
  this.tail = qelem;
  this._size++;
};

/** Removes and returns the item at the front of the queue
* @return {Object} The item at the front of the queue. Null if queue is empty.
*/
Queue.prototype.pop = function() {
  var temp = this.head;
  if (this.head !== null) {
    this.head = this.head.next;
    this._size--;
  }

  return temp === null ? null : temp.elem;
};

/** Clear the queue. */
Queue.prototype.clear = function() {
  this.head = null;
  this.tail = null;
  this._size = 0;
};

/** Retrieve an iterator for this queue.
* @returns {QueueIterator}
*/
Queue.prototype.newIterator = function() {
  return new Queue.QueueIterator(this.head);
};

/** Returns whether this queue contains the target object.
* @returns {boolean}
*/
Queue.prototype.contains = function(target) {
  var it = this.newIterator();
  var element = null;
  while ((element = it.getCurrent()) !== null ) {
    if (element === target || (Utils.isFunction(element.equals) && element.equals(target))) return true;
    it.next();
  }
  return false;
};

/** Check if the specified object exists in the queue; if so return the element, else return null.
* @returns {Object}
*/
Queue.prototype.getByEquality = function(target) {
  var it = this.newIterator();
  var element = null;
  while ((element = it.getCurrent()) !== null ) {
    if (element === target || (Utils.isFunction(element.equals) && element.equals(target))) return element;
    it.next();
  }
  return null;
};

/** Returns the size of the queue
* @return {int} The size of the queue.
*/
Queue.prototype.size = function() {
  return this._size;
};

/** The node class for the Queue.
* @constructor
* @param {Object} elem The object for this node.
* @param {Object} next The next element in the queue.
*/
var QueueElement = function(elem,next) {
  this.elem = elem;
  this.next = next;
};

/** An iterator for a Queue.
* @constructor
* @param {QueueElement} head The head element of the Queue.
*/
Queue.QueueIterator = function(head) {
  this._ptr = head;
};

/** Return the object for the current position in the queue.
*/
Queue.QueueIterator.prototype.getCurrent = function() {
  return this._ptr === null ? null : this._ptr.elem;
};

/** Move the iterator to the next position in the queue. */
Queue.QueueIterator.prototype.next = function() {
  this._ptr = this._ptr === null ? null : this._ptr.next;
};

module.exports = Queue;
