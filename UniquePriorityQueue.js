var shaunlusk = shaunlusk || {};

/** Extension of shaunlusk.PriorityQueue.
* Enforces uniqueness of enqueued elements;
* attempts made to enqueue an element that is
* already in the queue will be ignored.
*
* Elements must implement getKey() method
* @constructor
*/
shaunlusk.UniquePriorityQueue = function() {
  shaunlusk.PriorityQueue.call(this);
  this._entryKeys = {};
};

shaunlusk.UniquePriorityQueue.prototype = new shaunlusk.PriorityQueue();
shaunlusk.UniquePriorityQueue.prototype.constructor = shaunlusk.UniquePriorityQueue;

/** Adds a new item to the queue.
* @param element {Object} The item to be added to the queue.  Must implement getKey() method.
* @override
*/
shaunlusk.UniquePriorityQueue.prototype.insert = function(element) {
  if (this._entryKeys[element.getKey()]) return;
  this._entryKeys[element.getKey()] = true;
  shaunlusk.PriorityQueue.prototype.insert.call(this, element);
};

/** Clear the queue. */
shaunlusk.UniquePriorityQueue.prototype.clear = function() {
  this._entryKeys = {};
  shaunlusk.PriorityQueue.prototype.clear.call(this);
};

/** Removes and returns the item at the front of the queue
* @return {Object} The item at the front of the queue.
*/
shaunlusk.UniquePriorityQueue.prototype.extractMax = function() {
  var element = shaunlusk.PriorityQueue.prototype.extractMax.call(this);
  if (element && shaunlusk.isFunction(element.getKey) && this._entryKeys[element.getKey()]) delete this._entryKeys[element.getKey()];
  return element;
};

/** Returns whether the item exists in the queue.
* @param element {IComparable} The element to search for.
* @return {boolean} True if the element is in the queue; false otherwise.
*/
shaunlusk.UniquePriorityQueue.prototype.contains = function(element) {
  return this._entryKeys[element.getKey()] === true;
};

/** Remove the specified element from the queue.
* @param {Object} element
*/
shaunlusk.UniquePriorityQueue.prototype.remove = function(element) {
  shaunlusk.PriorityQueue.prototype.remove.call(this, element);
  if (this._entryKeys[element.getKey()]) delete this._entryKeys[element.getKey()];
};

/** Removes and returns the item at the front of the queue
* @method
* @return {Object} The item at the front of the queue.
*/
shaunlusk.UniquePriorityQueue.prototype.pop = shaunlusk.UniquePriorityQueue.prototype.extractMax;

/** Removes and returns the item at the front of the queue
* @method
* @return {Object} The item at the front of the queue.
*/
shaunlusk.UniquePriorityQueue.prototype.poll = shaunlusk.UniquePriorityQueue.prototype.extractMax;

/** Adds a new item to the queue.
* @method
* @param element {IComparable} The item to be added to the queue.  Must implement Comparable.
*/
shaunlusk.UniquePriorityQueue.prototype.push = shaunlusk.UniquePriorityQueue.prototype.insert;
