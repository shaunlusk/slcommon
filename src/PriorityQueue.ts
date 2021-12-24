/** @interface */
export interface IComparable<T> {
  /**
  * @param other {Object} The object to compare to this one.
  * @returns {int} -1: less than the other object; 0 equivalent to the other object; 1 greater than the other object.
  */
  compareTo: (other: T) => number;
  /**
  * @param other {Object} The object to compare to this one.
  * @returns {boolean} true if the objects are equivalent, false otherwise.
  */
  equals: (other: T) => boolean;
}

/** @class Heap-based priority queue */
export class PriorityQueue<T extends IComparable<T>>  {

  private _heapSize = 0;
  private _a: T[] = [];

  /** True: largest values will be at the front of the queue.
  * False: smallest values will be at the front of the queue.
  * False by default.
  */
  private _invertPriority = false;

  public setInvertPriority(bool: boolean) {
    this._invertPriority = bool;
    this._sort();
  }

  
  /** Get/Set whether this queue has inverted priority or not.
  * False: smallest values will be at the front of the queue.
  * True: largest values will be at the front of the queue.
  * False by default.
  * Setting the value will cause the queue to be reordered.
  * @param bool {boolean}
  */
  public get invertPriority() {
    return this._invertPriority;
  }
  
  /** Get/Set whether this queue has inverted priority or not.
  * False: smallest values will be at the front of the queue.
  * True: largest values will be at the front of the queue.
  * False by default.
  * Setting the value will cause the queue to be reordered.
  * @param bool {boolean}
  */
  public set invertPriority(val: boolean) {
    this._invertPriority = val;
    this._sort();
  }

  /** Sorts the queue.  */
  private _sort() {
    this._buildMaxHeap();

    for (let i = this._heapSize - 1; i >= 1; i--) {
      this._swap(0,i);
      this._maxHeapify(0, (this._heapSize - (this._heapSize-i)) );
    }
  }

  public toSortedArray() {
    this._sort();
    return [...this._a];
  }

  /** @private */
  private _maxHeapify = function(i: number, size: number, dir?: number) {
    let largest = 0;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (dir === undefined) dir = this.invertPriority ? -1 : 1;

    if ( left < size && this._a[left].compareTo(this._a[i]) === dir ) {
      largest = left;
    } else {
      largest = i;
    }

    if ( right < size && this._a[right].compareTo(this._a[largest]) === dir ) {
      largest = right;
    }

    if ( largest != i ) {
      this._swap(i,largest);
      this._maxHeapify( largest, size, dir );
    }
  }

  /** @private */
  private _swap(i1: number, i2: number) {
    const temp = this._a[i1];
    this._a[i1] = this._a[i2];
    this._a[i2] = temp;
  }

  /** @private */
  private _buildMaxHeap() {
    for (let i = Math.floor((this._heapSize - 1) / 2); i >= 0; i--) {
      this._maxHeapify( i, this._heapSize );
    }
  }

  /** Removes and returns the item at the front of the queue
  * @return {Object} The item at the front of the queue.
  */
  public extractMax(): T {
    if ( this._heapSize < 1 ) {
      return null;
    }

    const max = this._a[0];
    this._a[0] = this._a[this._heapSize-1];
    this._heapSize--;
    this._maxHeapify( 0, this._heapSize,  this._invertPriority ? 1 : -1);
    return max;
  }

  /** Adds a new item to the queue.
  * @param element {PriorityQueue.IComparable} The item to be added to the queue.  Must implement Comparable.
  */
  public insert(element: T) {
    const i = this._heapSize;

    if (this._heapSize === this._a.length)
      this._a.push(element);
    else
      this._a[i] = element;
    this._heapSize++;

    this._increaseKey(i);
  }

  /** Used to update the queue when a element's priority has been increased.
  * Assumes the element has already been inserted.
  * Assumes you have updated the value on your own.
  * @param i {int} The index of the element to be updated.
  * @private
  */
  private _increaseKey(i: number) {
    while (i > 0 && this._a[this._parent(i)].compareTo(this._a[i]) === (this.invertPriority ? -1 : 1)) {
      this._swap(i,this._parent(i));
      i = this._parent(i);
    }
  }

  /** Used to update the queue when a element's priority has been changed.
  * Assumes the element has already been inserted.
  * Assumes you have updated the value on your own.
  * @param element {Object} The element to update
  */
  public updateElement(element: T) {
    const i = this._a.indexOf(element);
    this._increaseKey(i);
  }

  /** Retrieve the element at a specified index.
  * Throws an error if i is out of bounds.
  * @param i {int} The index of the target element
  * @return {Object} The element found at the specified index.
  */
  public getByIndex(i: number): T {
    if (i > this._heapSize || i < 0)
      throw new Error("Index out of bounds: " + i + ". (queue size:" + this._heapSize + ")");
    return this._a[i];
  }

  /** Retrieve elements that match a query.
  * @param queryCallback {function} A callback that returns whether an element matches
  * @return {Object} The element if found; null otherwise.
  */
  public filter(queryCallback: (el: T) => boolean): T[] {
    return this._a.filter(queryCallback);
  }

  /** Returns the size of the queue
  * @return {int} The size of the queue.
  */
  public size() {
    return this._heapSize;
  }

  /** Returns the size of the queue
  * @return {int} The size of the queue.
  */
  public get length() {
    return this._heapSize;
  }

  /** Returns whether the item exists in the queue.
  * @param element {PriorityQueue.IComparable} The element to search for.
  * @return {boolean} True if the element is in the queue; false otherwise.
  */
  public contains(element: T) {
    for (let i = 0; i < this._heapSize; i++) {
      if (element.equals(this._a[i])) return true;
    }
    return false;
  }

  /** Returns the index of the item if it exists in the queue.
  * @param element {PriorityQueue.IComparable} The element to search for.
  * @return {int} The index of the element in the queue; -1 if it does not exist.
  */
  public indexOf(element: T) {
    for (let i = 0; i < this._heapSize; i++) {
      if (element.equals(this._a[i])) return i;
    }
    return -1;
  }

  /**
  * @param element {PriorityQueue.IComparable} The element to be removed from the list.
  */
  public remove(element: T) {
    if ( this._heapSize < 1 ) {
      return;
    }

    const idx = this.indexOf(element);
    if (idx < 0) return;

    this._a[idx] = this._a[this._heapSize-1];
    this._heapSize--;
    this._maxHeapify( idx, this._heapSize,  this._invertPriority ? 1 : -1);
  }

  /** Clear the queue. */
  public clear() {
    this._heapSize = 0;
    this._a = [];
  }

  /** @private */
  private _parent(i: number) { return Math.floor((i - 1) / 2); };

  /** Removes and returns the item at the front of the queue
  * @method
  * @return {Object} The item at the front of the queue.
  */
  public pop = PriorityQueue.prototype.extractMax;

  /** Removes and returns the item at the front of the queue
  * @method
  * @return {Object} The item at the front of the queue.
  */
  public poll = PriorityQueue.prototype.extractMax;

  /** Adds a new item to the queue.
  * @method
  * @param element {PriorityQueue.IComparable} The item to be added to the queue.  Must implement Comparable.
  */
  public push = PriorityQueue.prototype.insert;

  /** Retrieve the element at the front of the queue.
  * @return {Object} The element at the front of the queue.
  */
  public peek(): T {return this._heapSize < 1 ? null : this._a[0];};

}
