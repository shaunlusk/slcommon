var shaunlusk = shaunlusk || {};

shaunlusk.Utils = {};

/** Check whether the argument is a function.
* @memberof C64Style
* @param {Object} callback The object to check.
* @returns {boolean} true if it is a function, false otherwise.
*/
shaunlusk.isFunction = function(callback) {return typeof callback === "function";};

/** Search an array for a given value, using an equality function; returns the index
* of the first occurence in the array, or -1 if not found.
* This can be used to search for objects with a given property value.
* @param {Array} array The array to search
* @param {Object} value The target value to search for
* @param {Function} equalityFunction The function to use to compare array elements to the target value.
*   Should retruen true when elements are equal, false otherwise.
* @returns {integer} The index of the located value, or -1 if not found
*/
shaunlusk.linSearch = function(array, value, equalityFunction) {
  for (var i = 0; i < array.length; i++) {
    if (equalityFunction(array[i], value)) return i;
  }
  return -1;
};

shaunlusk.isNullOrUndefined = function(value) {
  return value === null || value === undefined;
}

shaunlusk.degreesToRadians = function(degrees) {
  return (degrees / 180) * Math.PI;
}
