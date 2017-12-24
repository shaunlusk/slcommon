/** An iterator for a {@link SL.PriorityQueue PriorityQueue}.
* @constructor
* @param {SL.QueueElement} head The head element of the Queue.
*/
SL.PriorityQueueIterator = function(heapArray, heapSize) {
  this._a = heapArray;
  this._heapSize = heapSize;
  this._idx = 0;
};

/** Return the object for the current position in the queue.
*/
SL.PriorityQueueIterator.prototype.getCurrent = function() {
  return this._idx < this._heapSize ? this._a[this._idx] : null;
};

/** Move the iterator to the next position in the queue. */
SL.PriorityQueueIterator.prototype.next = function() {
  if (this._idx < this._heapSize) this._idx++;
};
