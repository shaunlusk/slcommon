export class Utils {

  /** Check whether the argument is a function.
  * @param {Object} callback The object to check.
  * @returns {boolean} true if it is a function, false otherwise.
  */
  public static isFunction(callback: any): boolean {return typeof callback === "function";}

  /** Return whether the value is null or undefined.
  * @param {Any} value The value to test.
  * @returns {Boolean} True if the value is null or undefined; false otherwise.
  */
  public static isNullOrUndefined(value?: any) {
    return value === null || value === undefined;
  };

  /** Return the degree value converted to radians.
  * @param {Number} degrees The value in degrees.
  * @returns {Number} The value in radians.
  */
  public static degreesToRadians(degrees: number): number {
    return (degrees / 180) * Math.PI;
  };

  /** Return whether two boxes collide.
  * @param {Number} x1 The X coordinate top left corner of box 1.
  * @param {Number} y1 The y coordinate top left corner of box 1.
  * @param {Number} width1 The width of box 1.
  * @param {Number} height1 The X height of box 1.
  * @param {Number} x2 The X coordinate top left corner of box 2.
  * @param {Number} y2 The y coordinate top left corner of box 2.
  * @param {Number} width2 The width of box 2.
  * @param {Number} height2 The X height of box 2.
  * @returns {Boolean} Returns true if boxes overlap,
  * false if they only touch or are disjoint.
  */
  public static checkCollision(x1: number, y1: number, width1: number, height1: number, x2: number, y2: number, width2: number, height2: number): boolean {
    return x1 < x2 + width2 &&
      x1 + width1 > x2 &&
      y1 < y2 + height2 &&
      y1 + height1 > y2;
  };

}