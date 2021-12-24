import { IComparable } from "./IComparable";

/** @interface */
export interface IKeyedComparable<T> extends IComparable<T> {
  /** Provides a unique key for this object */
  getKey: () => string;
}