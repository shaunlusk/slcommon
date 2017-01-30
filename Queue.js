var shaunlusk = shaunlusk || {};

/** Simple Queue class
* @constructor
*/
shaunlusk.Queue = function() {
  this.head = null;
  this.tail = null;
  this._size = 0;
};

/** Adds a new item to the queue.
* @param {Object} elem The item to be added to the queue.
*/
shaunlusk.Queue.prototype.push = function(elem) {
  var qelem = new shaunlusk.QueueElement(elem,null);
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
shaunlusk.Queue.prototype.pop = function() {
  var temp = this.head;
  if (this.head !== null) {
    this.head = this.head.next;
    this._size--;
  }

  return temp === null ? null : temp.elem;
};

/** Clear the queue. */
shaunlusk.Queue.prototype.clear = function() {
  this.head = null;
  this.tail = null;
  this._size = 0;
};

/** Retrieve an iterator for this queue.
* @returns {shaunlusk.QueueIterator}
*/
shaunlusk.Queue.prototype.newIterator = function() {
  return new shaunlusk.QueueIterator(this.head);
};

/** Returns whether this queue contains the target object.
* @returns {boolean}
*/
shaunlusk.Queue.prototype.contains = function(target) {
  var it = this.newIterator();
  var element = null;
  while ((element = it.getCurrent()) !== null ) {
    if (element === target || (shaunlusk.isFunction(element.equals) && element.equals(target))) return true;
    it.next();
  }
  return false;
};

/** Check if the specified object exists in the queue; if so return the element, else return null.
* @returns {Object}
*/
shaunlusk.Queue.prototype.getByEquality = function(target) {
  var it = this.newIterator();
  var element = null;
  while ((element = it.getCurrent()) !== null ) {
    if (element === target || (shaunlusk.isFunction(element.equals) && element.equals(target))) return element;
    it.next();
  }
  return null;
};

/** Returns the size of the queue
* @return {int} The size of the queue.
*/
shaunlusk.Queue.prototype.size = function() {
  return this._size;
};

/** The node class for the Queue.
* @constructor
* @param {Object} elem The object for this node.
* @param {Object} next The next element in the queue.
*/
shaunlusk.QueueElement = function(elem,next) {
  this.elem = elem;
  this.next = next;
};

/** An iterator for a Queue.
* @constructor
* @param {shaunlusk.QueueElement} head The head element of the Queue.
*/
shaunlusk.QueueIterator = function(head) {
  this._ptr = head;
};

/** Return the object for the current position in the queue.
*/
shaunlusk.QueueIterator.prototype.getCurrent = function() {
  return this._ptr === null ? null : this._ptr.elem;
};

/** Move the iterator to the next position in the queue. */
shaunlusk.QueueIterator.prototype.next = function() {
  this._ptr = this._ptr === null ? null : this._ptr.next;
};
