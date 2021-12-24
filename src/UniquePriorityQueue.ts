import { IKeyedComparable } from './IKeyedComparable';
import { PriorityQueue } from './PriorityQueue';
import { Utils } from './Utils';

/** Extension of PriorityQueue.
* Enforces uniqueness of enqueued elements;
* attempts made to enqueue an element that is
* already in the queue will be ignored.
*
* Elements must implement getKey() method
* @class
*/
export class UniquePriorityQueue<T extends IKeyedComparable<T>> extends PriorityQueue<T> {
  private _entryKeys: {[key: string]: boolean};

  public constructor() {
    super();
    this._entryKeys = {};
  }

  /** Adds a new item to the queue.
  * @param element {Object} The item to be added to the queue.  Must implement getKey() method.
  * @override
  */
  public insert(element: T) {
    if (this._entryKeys[element.getKey()]) return;
    this._entryKeys[element.getKey()] = true;
    PriorityQueue.prototype.insert.call(this, element);
  }

  /** Clear the queue. */
  public clear() {
    this._entryKeys = {};
    PriorityQueue.prototype.clear.call(this);
  }

  /** Removes and returns the item at the front of the queue
  * @return {Object} The item at the front of the queue.
  */
  public extractMax() {
    const element = PriorityQueue.prototype.extractMax.call(this);
    if (element && Utils.isFunction(element.getKey) && this._entryKeys[element.getKey()]) delete this._entryKeys[element.getKey()];
    return element;
  }

  /** Returns whether the item exists in the queue.
  * @param element {IComparable} The element to search for.
  * @return {boolean} True if the element is in the queue; false otherwise.
  */
  public contains(element: T) {
    return this._entryKeys[element.getKey()] === true;
  }

  /** Remove the specified element from the queue.
  * @param {Object} element
  */
  public remove(element: T) {
    PriorityQueue.prototype.remove.call(this, element);
    if (this._entryKeys[element.getKey()]) delete this._entryKeys[element.getKey()];
  }

  /** Removes and returns the item at the front of the queue
  * @method
  * @return {Object} The item at the front of the queue.
  */
  public pop() { return this.extractMax(); }

  /** Removes and returns the item at the front of the queue
  * @method
  * @return {Object} The item at the front of the queue.
  */
  poll() { return this.extractMax(); }

  /** Adds a new item to the queue.
  * @method
  * @param element {IComparable} The item to be added to the queue.  Must implement Comparable.
  */
  push(value: T) { this.insert(value); }
}
