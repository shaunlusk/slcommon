/** @namespace */
var Utils = {};

/** Check whether the argument is a function.
* @param {Object} callback The object to check.
* @returns {boolean} true if it is a function, false otherwise.
*/
Utils.isFunction = function(callback) {return typeof callback === "function";};

/** Search an array for a given value, using an equality function; returns the index
* of the first occurence in the array, or -1 if not found.
* This can be used to search for objects with a given property value.
* @param {Array} array The array to search
* @param {Object} value The target value to search for
* @param {Function} equalityFunction The function to use to compare array elements to the target value.
*   Should retruen true when elements are equal, false otherwise.
* @returns {integer} The index of the located value, or -1 if not found
*/
Utils.linSearch = function(array, value, equalityFunction) {
  for (var i = 0; i < array.length; i++) {
    if (equalityFunction(array[i], value)) return i;
  }
  return -1;
};

/** Return whether the value is null or undefined.
* @param {Any} value The value to test.
* @returns {Boolean} True if the value is null or undefined; false otherwise.
*/
Utils.isNullOrUndefined = function(value) {
  return value === null || value === undefined;
};

/** Return the degree value converted to radians.
* @param {Number} degrees The value in degrees.
* @returns {Number} The value in radians.
*/
Utils.degreesToRadians = function(degrees) {
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
Utils.checkCollision = function(x1, y1, width1, height1, x2, y2, width2, height2) {
  return x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    y1 + height1 > y2;
};

/** Merge a collection of properties into an object.
* Modifies the object.
* @param {Object} properties The set of properties to merge into the object.
* @param {Object} object The object to recieve the properties.
*/
Utils.mergeProperties = function(properties, object) {
  var keys = Object.keys(properties);
  if (!keys) return;
  keys.forEach(function(key) {
    object[key] = properties[key];
  });
};

module.exports = Utils;
