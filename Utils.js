var shaunlusk = shaunlusk || {};

shaunlusk.Utils = {};

/** Check whether the argument is a function.
* @memberof C64Style
* @param {Object} callback The object to check.
* @returns {boolean} true if it is a function, false otherwise.
*/
shaunlusk.Utils.isFunction = function(callback) {return typeof callback === "function";};
