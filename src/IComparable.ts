/** Supports comparisons between objects.
 * @interface 
 */
export interface IComparable<T> {
  /** Compare another object to this one.
  * @param other {Object} The object to compare to this one.
  * @returns {int} -1: less than the other object; 0 equivalent to the other object; 1 greater than the other object.
  */
  compareTo: (other: T) => number;
  /** Check is this object is equal to another.
  * @param other {Object} The object to compare to this one.
  * @returns {boolean} true if the objects are equivalent, false otherwise.
  */
  equals: (other: T) => boolean;
}
