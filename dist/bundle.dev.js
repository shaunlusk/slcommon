/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Event */ \"./src/Event.js\");\n/* harmony import */ var _src_Event__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_Event__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_EventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/EventManager */ \"./src/EventManager.js\");\n/* harmony import */ var _src_EventManager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_EventManager__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_EventNotifierMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/EventNotifierMixin */ \"./src/EventNotifierMixin.js\");\n/* harmony import */ var _src_EventNotifierMixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_EventNotifierMixin__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_PriorityQueue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/PriorityQueue */ \"./src/PriorityQueue.js\");\n/* harmony import */ var _src_PriorityQueue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_PriorityQueue__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _src_Queue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Queue */ \"./src/Queue.js\");\n/* harmony import */ var _src_Queue__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_src_Queue__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _src_UniquePriorityQueue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/UniquePriorityQueue */ \"./src/UniquePriorityQueue.js\");\n/* harmony import */ var _src_UniquePriorityQueue__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_src_UniquePriorityQueue__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _src_Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Utils */ \"./src/Utils.js\");\n/* harmony import */ var _src_Utils__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_src_Utils__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nif (typeof self !== 'undefined' && self) {\n  self.SL = self.SL || {};\n  self.SL.Event = _src_Event__WEBPACK_IMPORTED_MODULE_0___default.a;\n  self.SL.EventManager = _src_EventManager__WEBPACK_IMPORTED_MODULE_1___default.a;\n  self.SL.EventNotifierMixin = _src_EventNotifierMixin__WEBPACK_IMPORTED_MODULE_2___default.a;\n  self.SL.PriorityQueue = _src_PriorityQueue__WEBPACK_IMPORTED_MODULE_3___default.a;\n  self.SL.Queue = _src_Queue__WEBPACK_IMPORTED_MODULE_4___default.a;\n  self.SL.UniquePriorityQueue = _src_UniquePriorityQueue__WEBPACK_IMPORTED_MODULE_5___default.a;\n  self.SL.Utils = _src_Utils__WEBPACK_IMPORTED_MODULE_6___default.a;\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/Event.js":
/*!**********************!*\
  !*** ./src/Event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Create an Event.\n* @class\n* @param {string} type The type of the event.\n* @param {Object} data Data for the event.  Determined by event emitter\n* @param {time} time Optional.  The time the event occurred. If not specified, uses Date.now()\n*/\nfunction Event(type, data, time) {\n  /** @member {string} */\n  this.type = type;\n  /** @member {Object} */\n\n  this.data = data;\n  /** @member {time} */\n\n  this.time = time || Date.now();\n}\n\n;\nmodule.exports = Event;\n\n//# sourceURL=webpack:///./src/Event.js?");

/***/ }),

/***/ "./src/EventManager.js":
/*!*****************************!*\
  !*** ./src/EventManager.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var EventNotifierMixin = __webpack_require__(/*! ./EventNotifierMixin */ \"./src/EventNotifierMixin.js\");\n/**\n* Tracks event handlers and notifies them when events occur.\n* See {@link EventNotifierMixin} for full documentaiton.\n* @class\n* @augment {EventNotifierMixin}\n* @see EventNotifierMixin\n*/\n\n\nfunction EventManager() {\n  this.EventNotifierMixinInitializer({\n    eventListeners: []\n  });\n}\n\n;\nEventNotifierMixin.call(EventManager.prototype);\nmodule.exports = EventManager;\n\n//# sourceURL=webpack:///./src/EventManager.js?");

/***/ }),

/***/ "./src/EventNotifierMixin.js":
/*!***********************************!*\
  !*** ./src/EventNotifierMixin.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Utils = __webpack_require__(/*! ./Utils */ \"./src/Utils.js\");\n\nvar Event = __webpack_require__(/*! ./Event */ \"./src/Event.js\");\n/** Add Event Notification functions to a class.\n* Tracks event handlers and notifies them when events occur.\n* Usage:\n* Call:\n*   EventNotifierMixin.call(MyClass.prototype);\n* And in your constructor, call initializer\"\n*   this.EventNotifierMixinInitializer();\n* Then you can add handlers:\n*   myClassInstance.on(\"myEvent1\", someHandlerCallback);\n* @class\n*/\n\n\nfunction EventNotifierMixin(props) {\n  props = props || {};\n  this._eventNotifierMixinId = EventNotifierMixin.id++;\n  this._eventNotifierMixinHandlerId = 0;\n  this._EventNotifierMixin_debug = props.EventNotifierMixin_debug || false;\n\n  this.EventNotifierMixinInitializer = function () {\n    this._eventListeners = {};\n  };\n  /** Add an event handler to the handler list.\n  * @param {EventType} eventType The type of the event.\n  * @param {Function} callback The handler to call when the specified event type occurs\n  * @param {string} id Optional. An Id to reference the handler by.\n  * @return {string} The id to reference the handler by.  For use in removing the handler.  If not explicitly provided a handler Id will be generated.\n  */\n\n\n  this.addEventHandler = function (eventType, callback, id) {\n    var handlerId = id || \"eventHandler_\" + this._eventNotifierMixinId + \".\" + this._eventNotifierMixinHandlerId;\n    this._eventNotifierMixinHandlerId++;\n\n    if (!this._eventListeners[eventType]) {\n      this.registerEventType(eventType);\n    }\n\n    this._eventListeners[eventType][handlerId] = callback;\n    return handlerId;\n  };\n  /** Register an event type.\n  * @private\n  */\n\n\n  this.registerEventType = function (eventType) {\n    this._eventListeners[eventType] = this._eventListeners[eventType] || {};\n  };\n  /** Alias for 'add'. Add an event handler to the handler list.\n  * @param {EventType} eventType The type of the event.\n  * @param {Function} callback The handler to call when the specified event type occurs\n  * @param {string} id Optional. An Id to reference the handler by.\n  */\n\n\n  this.on = this.addEventHandler;\n  /** Remove an event handler.\n  * @param {string} eventHandlerId The id of the handler to remove.\n  */\n\n  this.removeEventHandler = function (eventHandlerId) {\n    // delete\n    Object.keys(this._eventListeners).forEach(function (listenerKey) {\n      if (this._eventListeners[listenerKey][eventHandlerId]) delete this._eventListeners[listenerKey][eventHandlerId];\n    }.bind(this));\n  };\n  /** Clear all event handlers for a given event type.\n  * @param {EventType} eventType The type of the event.\n  */\n\n\n  this.clearEventHandlers = function (eventType) {\n    if (!this._eventListeners[eventType] && this._EventNotifierMixin_debug) {\n      console.log(\"Unknown event type:\" + eventType);\n    }\n\n    this._eventListeners[eventType] = {};\n  };\n  /** Notify event handlers when an event has occured.\n   * Overloads:\n   * <ul>\n   * <li>notify(anEvent);</li>\n   * <li>notify(eventType, someDate, eventTime);</li>\n   * </ul>\n  * @param {(Event|string)} event The event that occured, or the type of event.\n  * @param {Object} [data] The data associated with the event, if the first argument is the event type.\n  * @param {time} [time] The time of the event, if the first argument is the event type.\n  */\n\n\n  this.notify = function (eventOrEventType, data, time) {\n    var event = null;\n\n    if (eventOrEventType instanceof Event) {\n      event = eventOrEventType;\n    } else {\n      event = new Event(eventOrEventType, data, time);\n    }\n\n    if (!this._eventListeners[event.type]) {\n      if (this._EventNotifierMixin_debug) console.log(\"Unknown event type:\" + event.type);\n      return;\n    }\n\n    var keys = Object.keys(this._eventListeners[event.type]);\n\n    for (var i = 0; i < keys.length; i++) {\n      if (Utils.isFunction(this._eventListeners[event.type][keys[i]])) this._eventListeners[event.type][keys[i]](event);\n    }\n  };\n}\n\n;\nEventNotifierMixin.id = 0;\nmodule.exports = EventNotifierMixin;\n\n//# sourceURL=webpack:///./src/EventNotifierMixin.js?");

/***/ }),

/***/ "./src/PriorityQueue.js":
/*!******************************!*\
  !*** ./src/PriorityQueue.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** @class Heap-based priority queue */\nfunction PriorityQueue() {\n  this._heapSize = 0;\n  this._a = [];\n  /** True: largest values will be at the front of the queue.\n  * False: smallest values will be at the front of the queue.\n  * False by default.\n  */\n\n  this.invertPriority = false;\n}\n\n;\n/** IComparable\n* @interface\n*/\n\nPriorityQueue.IComparable = function () {};\n/**\n* @param other {Object} The object to compare to this one.\n* @returns {int} -1: less than the other object; 0 equivalent to the other object; 1 greater than the other object.\n*/\n\n\nPriorityQueue.IComparable.prototype.compareTo = function (other) {\n  throw new Error('not implemented');\n};\n/**\n* @param other {Object} The object to compare to this one.\n* @returns {boolean} true if the objects are equivalent, false otherwise.\n*/\n\n\nPriorityQueue.IComparable.prototype.equals = function (other) {\n  throw new Error('not implemented');\n};\n/** Set whether this queue has inverted priority or not.\n* False: smallest values will be at the front of the queue.\n* True: largest values will be at the front of the queue.\n* False by default.\n* Setting the value will cause the queue to be reordered.\n* @param bool {boolean}\n*/\n\n\nPriorityQueue.prototype.setInvertPriority = function (bool) {\n  this.invertPriority = bool;\n  this.sort();\n};\n/** Sorts the queue.  */\n\n\nPriorityQueue.prototype.sort = function () {\n  this._buildMaxHeap();\n\n  for (var i = this._heapSize - 1; i >= 1; i--) {\n    this._swap(0, i);\n\n    this._maxHeapify(0, this._heapSize - (this._heapSize - i));\n  }\n};\n/** @private */\n\n\nPriorityQueue.prototype._maxHeapify = function (i, size, dir) {\n  var largest = 0;\n  var left = 2 * i + 1;\n  var right = 2 * i + 2;\n  if (dir === undefined) dir = this.invertPriority ? -1 : 1;\n\n  if (left < size && this._a[left].compareTo(this._a[i]) === dir) {\n    largest = left;\n  } else {\n    largest = i;\n  }\n\n  if (right < size && this._a[right].compareTo(this._a[largest]) === dir) {\n    largest = right;\n  }\n\n  if (largest != i) {\n    this._swap(i, largest);\n\n    this._maxHeapify(largest, size, dir);\n  }\n};\n/** @private */\n\n\nPriorityQueue.prototype._swap = function (i1, i2) {\n  var temp = this._a[i1];\n  this._a[i1] = this._a[i2];\n  this._a[i2] = temp;\n};\n/** @private */\n\n\nPriorityQueue.prototype._buildMaxHeap = function () {\n  for (var i = Math.floor((this._heapSize - 1) / 2); i >= 0; i--) {\n    this._maxHeapify(i, this._heapSize);\n  }\n};\n/** Removes and returns the item at the front of the queue\n* @return {Object} The item at the front of the queue.\n*/\n\n\nPriorityQueue.prototype.extractMax = function () {\n  if (this._heapSize < 1) {\n    return null;\n  }\n\n  var max = this._a[0];\n  this._a[0] = this._a[this._heapSize - 1];\n  this._heapSize--;\n\n  this._maxHeapify(0, this._heapSize, this.invertPriority ? 1 : -1);\n\n  return max;\n};\n/** Adds a new item to the queue.\n* @param element {PriorityQueue.IComparable} The item to be added to the queue.  Must implement Comparable.\n*/\n\n\nPriorityQueue.prototype.insert = function (element) {\n  var i = this._heapSize;\n  if (this._heapSize === this._a.length) this._a.push(element);else this._a[i] = element;\n  this._heapSize++;\n  this.increaseKey(i);\n};\n/** Used to update the queue when a element's priority has been increased.\n* Assumes the element has already been inserted.\n* Assumes you have updated the value on your own.\n* @param i {int} The index of the element to be updated.\n*/\n\n\nPriorityQueue.prototype.increaseKey = function (i) {\n  while (i > 0 && this._a[this._parent(i)].compareTo(this._a[i]) === (this.invertPriority ? -1 : 1)) {\n    this._swap(i, this._parent(i));\n\n    i = this._parent(i);\n  }\n};\n/** Used to update the queue when a element's priority has been decreased.\n* Assumes the element has already been inserted.\n* Assumes you have updated the value on your own.\n* @param i {int} The index of the element to be updated.\n*/\n\n\nPriorityQueue.prototype.decreaseKey = function (i) {\n  this._maxHeapify(i, this._heapSize, this.invertPriority ? 1 : -1);\n};\n/** Retrieve the element at a specified index.\n* Throws an error if i is out of bounds.\n* @param i {int} The index of the target element\n* @return {Object} The element found at the specified index.\n*/\n\n\nPriorityQueue.prototype.getByIndex = function (i) {\n  if (i > this._heapSize || i < 0) throw new Error(\"Index out of bounds: \" + i + \". (queue size:\" + this._heapSize + \")\");\n  return this._a[i];\n};\n/** Retrieve the first element that equals one specified.\n* Use this if you need to update the value/priority of an element in the queue.\n* @param i {IComparable} An element to search for.\n* @return {Object} The element if found; null otherwise.\n*/\n\n\nPriorityQueue.prototype.getByEquality = function (element) {\n  var idx = this.indexOf(element);\n  if (idx === -1) return null;\n  return this._a[idx];\n};\n/** Returns the size of the queue\n* @return {int} The size of the queue.\n*/\n\n\nPriorityQueue.prototype.size = function () {\n  return this._heapSize;\n};\n/** Returns whether the item exists in the queue.\n* @param element {PriorityQueue.IComparable} The element to search for.\n* @return {boolean} True if the element is in the queue; false otherwise.\n*/\n\n\nPriorityQueue.prototype.contains = function (element) {\n  for (var i = 0; i < this._heapSize; i++) {\n    if (element.equals(this._a[i])) return true;\n  }\n\n  return false;\n};\n/** Returns the index of the item if it exists in the queue.\n* @param element {PriorityQueue.IComparable} The element to search for.\n* @return {int} The index of the element in the queue; -1 if it does not exist.\n*/\n\n\nPriorityQueue.prototype.indexOf = function (element) {\n  for (var i = 0; i < this._heapSize; i++) {\n    if (element.equals(this._a[i])) return i;\n  }\n\n  return -1;\n};\n/**\n* @param element {PriorityQueue.IComparable} The element to be removed from the list.\n*/\n\n\nPriorityQueue.prototype.remove = function (element) {\n  if (this._heapSize < 1) {\n    return;\n  }\n\n  var idx = this.indexOf(element);\n  if (idx < 0) return;\n  this._a[idx] = this._a[this._heapSize - 1];\n  this._heapSize--;\n\n  this._maxHeapify(idx, this._heapSize, this.invertPriority ? 1 : -1);\n};\n/** Clear the queue. */\n\n\nPriorityQueue.prototype.clear = function () {\n  this._heapSize = 0;\n};\n/** @private */\n\n\nPriorityQueue.prototype._verifyHeap = function (i) {\n  if (i === undefined || i === null) i = 0;\n  if (i >= this._heapSize) return true;\n  var dir = this.invertPriority ? 1 : -1;\n  var left = 2 * i + 1;\n  var right = 2 * i + 2;\n  var isok = true;\n  if (left < this._heapSize && this._a[left].compareTo(this._a[i]) === dir) isok = false;\n  if (isok && right < this._heapSize && this._a[right].compareTo(this._a[i]) === dir) isok = false;\n\n  if (isok && left < this._heapSize) {\n    isok = this._verifyHeap(left);\n\n    if (isok && right < this._heapSize) {\n      isok = this._verifyHeap(right);\n    }\n  }\n\n  return isok;\n};\n/** @private */\n\n\nPriorityQueue.prototype._parent = function (i) {\n  return Math.floor((i - 1) / 2);\n};\n/** Removes and returns the item at the front of the queue\n* @method\n* @return {Object} The item at the front of the queue.\n*/\n\n\nPriorityQueue.prototype.pop = PriorityQueue.prototype.extractMax;\n/** Removes and returns the item at the front of the queue\n* @method\n* @return {Object} The item at the front of the queue.\n*/\n\nPriorityQueue.prototype.poll = PriorityQueue.prototype.extractMax;\n/** Adds a new item to the queue.\n* @method\n* @param element {PriorityQueue.IComparable} The item to be added to the queue.  Must implement Comparable.\n*/\n\nPriorityQueue.prototype.push = PriorityQueue.prototype.insert;\n/** Retrieve the element at the front of the queue.\n* @return {Object} The element at the front of the queue.\n*/\n\nPriorityQueue.prototype.peek = function () {\n  return this._heapSize < 1 ? null : this._a[0];\n};\n\nmodule.exports = PriorityQueue;\n\n//# sourceURL=webpack:///./src/PriorityQueue.js?");

/***/ }),

/***/ "./src/Queue.js":
/*!**********************!*\
  !*** ./src/Queue.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Utils = __webpack_require__(/*! ./Utils */ \"./src/Utils.js\");\n/** Simple Queue class\n* @constructor\n*/\n\n\nvar Queue = function Queue() {\n  this.head = null;\n  this.tail = null;\n  this._size = 0;\n};\n/** Adds a new item to the queue.\n* @param {Object} elem The item to be added to the queue.\n*/\n\n\nQueue.prototype.push = function (elem) {\n  var qelem = new QueueElement(elem, null);\n\n  if (this._size === 0) {\n    this.head = qelem;\n  } else {\n    this.tail.next = qelem;\n  }\n\n  this.tail = qelem;\n  this._size++;\n};\n/** Removes and returns the item at the front of the queue\n* @return {Object} The item at the front of the queue. Null if queue is empty.\n*/\n\n\nQueue.prototype.pop = function () {\n  var temp = this.head;\n\n  if (this.head !== null) {\n    this.head = this.head.next;\n    this._size--;\n  }\n\n  return temp === null ? null : temp.elem;\n};\n/** Clear the queue. */\n\n\nQueue.prototype.clear = function () {\n  this.head = null;\n  this.tail = null;\n  this._size = 0;\n};\n/** Retrieve an iterator for this queue.\n* @returns {Queue.QueueIterator}\n*/\n\n\nQueue.prototype.newIterator = function () {\n  return new Queue.QueueIterator(this.head);\n};\n/** Returns whether this queue contains the target object.\n* @returns {boolean}\n*/\n\n\nQueue.prototype.contains = function (target) {\n  var it = this.newIterator();\n  var element = null;\n\n  while ((element = it.getCurrent()) !== null) {\n    if (element === target || Utils.isFunction(element.equals) && element.equals(target)) return true;\n    it.next();\n  }\n\n  return false;\n};\n/** Check if the specified object exists in the queue; if so return the element, else return null.\n* @returns {Object}\n*/\n\n\nQueue.prototype.getByEquality = function (target) {\n  var it = this.newIterator();\n  var element = null;\n\n  while ((element = it.getCurrent()) !== null) {\n    if (element === target || Utils.isFunction(element.equals) && element.equals(target)) return element;\n    it.next();\n  }\n\n  return null;\n};\n/** Returns the size of the queue\n* @return {int} The size of the queue.\n*/\n\n\nQueue.prototype.size = function () {\n  return this._size;\n};\n/** The node class for the Queue.\n* @constructor\n* @param {Object} elem The object for this node.\n* @param {Object} next The next element in the queue.\n*/\n\n\nvar QueueElement = function QueueElement(elem, next) {\n  this.elem = elem;\n  this.next = next;\n};\n/** An iterator for a Queue.\n* @constructor\n* @param {QueueElement} head The head element of the Queue.\n*/\n\n\nQueue.QueueIterator = function (head) {\n  this._ptr = head;\n};\n/** Return the object for the current position in the queue.\n*/\n\n\nQueue.QueueIterator.prototype.getCurrent = function () {\n  return this._ptr === null ? null : this._ptr.elem;\n};\n/** Move the iterator to the next position in the queue. */\n\n\nQueue.QueueIterator.prototype.next = function () {\n  this._ptr = this._ptr === null ? null : this._ptr.next;\n};\n\nmodule.exports = Queue;\n\n//# sourceURL=webpack:///./src/Queue.js?");

/***/ }),

/***/ "./src/UniquePriorityQueue.js":
/*!************************************!*\
  !*** ./src/UniquePriorityQueue.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var PriorityQueue = __webpack_require__(/*! ./PriorityQueue */ \"./src/PriorityQueue.js\");\n\nvar Utils = __webpack_require__(/*! ./Utils */ \"./src/Utils.js\");\n/** Extension of PriorityQueue.\n* Enforces uniqueness of enqueued elements;\n* attempts made to enqueue an element that is\n* already in the queue will be ignored.\n*\n* Elements must implement getKey() method\n* @constructor\n*/\n\n\nfunction UniquePriorityQueue() {\n  PriorityQueue.call(this);\n  this._entryKeys = {};\n}\n\n;\nUniquePriorityQueue.prototype = new PriorityQueue();\nUniquePriorityQueue.prototype.constructor = UniquePriorityQueue;\n/** Adds a new item to the queue.\n* @param element {Object} The item to be added to the queue.  Must implement getKey() method.\n* @override\n*/\n\nUniquePriorityQueue.prototype.insert = function (element) {\n  if (this._entryKeys[element.getKey()]) return;\n  this._entryKeys[element.getKey()] = true;\n  PriorityQueue.prototype.insert.call(this, element);\n};\n/** Clear the queue. */\n\n\nUniquePriorityQueue.prototype.clear = function () {\n  this._entryKeys = {};\n  PriorityQueue.prototype.clear.call(this);\n};\n/** Removes and returns the item at the front of the queue\n* @return {Object} The item at the front of the queue.\n*/\n\n\nUniquePriorityQueue.prototype.extractMax = function () {\n  var element = PriorityQueue.prototype.extractMax.call(this);\n  if (element && Utils.isFunction(element.getKey) && this._entryKeys[element.getKey()]) delete this._entryKeys[element.getKey()];\n  return element;\n};\n/** Returns whether the item exists in the queue.\n* @param element {IComparable} The element to search for.\n* @return {boolean} True if the element is in the queue; false otherwise.\n*/\n\n\nUniquePriorityQueue.prototype.contains = function (element) {\n  return this._entryKeys[element.getKey()] === true;\n};\n/** Remove the specified element from the queue.\n* @param {Object} element\n*/\n\n\nUniquePriorityQueue.prototype.remove = function (element) {\n  PriorityQueue.prototype.remove.call(this, element);\n  if (this._entryKeys[element.getKey()]) delete this._entryKeys[element.getKey()];\n};\n/** Removes and returns the item at the front of the queue\n* @method\n* @return {Object} The item at the front of the queue.\n*/\n\n\nUniquePriorityQueue.prototype.pop = UniquePriorityQueue.prototype.extractMax;\n/** Removes and returns the item at the front of the queue\n* @method\n* @return {Object} The item at the front of the queue.\n*/\n\nUniquePriorityQueue.prototype.poll = UniquePriorityQueue.prototype.extractMax;\n/** Adds a new item to the queue.\n* @method\n* @param element {IComparable} The item to be added to the queue.  Must implement Comparable.\n*/\n\nUniquePriorityQueue.prototype.push = UniquePriorityQueue.prototype.insert;\nmodule.exports = UniquePriorityQueue;\n\n//# sourceURL=webpack:///./src/UniquePriorityQueue.js?");

/***/ }),

/***/ "./src/Utils.js":
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** @namespace */\nvar Utils = {};\n/** Check whether the argument is a function.\n* @param {Object} callback The object to check.\n* @returns {boolean} true if it is a function, false otherwise.\n*/\n\nUtils.isFunction = function (callback) {\n  return typeof callback === \"function\";\n};\n/** Search an array for a given value, using an equality function; returns the index\n* of the first occurence in the array, or -1 if not found.\n* This can be used to search for objects with a given property value.\n* @param {Array} array The array to search\n* @param {Object} value The target value to search for\n* @param {Function} equalityFunction The function to use to compare array elements to the target value.\n*   Should retruen true when elements are equal, false otherwise.\n* @returns {integer} The index of the located value, or -1 if not found\n*/\n\n\nUtils.linSearch = function (array, value, equalityFunction) {\n  for (var i = 0; i < array.length; i++) {\n    if (equalityFunction(array[i], value)) return i;\n  }\n\n  return -1;\n};\n/** Return whether the value is null or undefined.\n* @param {Any} value The value to test.\n* @returns {Boolean} True if the value is null or undefined; false otherwise.\n*/\n\n\nUtils.isNullOrUndefined = function (value) {\n  return value === null || value === undefined;\n};\n/** Return the degree value converted to radians.\n* @param {Number} degrees The value in degrees.\n* @returns {Number} The value in radians.\n*/\n\n\nUtils.degreesToRadians = function (degrees) {\n  return degrees / 180 * Math.PI;\n};\n/** Return whether two boxes collide.\n* @param {Number} x1 The X coordinate top left corner of box 1.\n* @param {Number} y1 The y coordinate top left corner of box 1.\n* @param {Number} width1 The width of box 1.\n* @param {Number} height1 The X height of box 1.\n* @param {Number} x2 The X coordinate top left corner of box 2.\n* @param {Number} y2 The y coordinate top left corner of box 2.\n* @param {Number} width2 The width of box 2.\n* @param {Number} height2 The X height of box 2.\n* @returns {Boolean} Returns true if boxes overlap,\n* false if they only touch or are disjoint.\n*/\n\n\nUtils.checkCollision = function (x1, y1, width1, height1, x2, y2, width2, height2) {\n  return x1 < x2 + width2 && x1 + width1 > x2 && y1 < y2 + height2 && y1 + height1 > y2;\n};\n/** Merge a collection of properties into an object.\n* Modifies the object.\n* @param {Object} properties The set of properties to merge into the object.\n* @param {Object} object The object to recieve the properties.\n*/\n\n\nUtils.mergeProperties = function (properties, object) {\n  var keys = Object.keys(properties);\n  if (!keys) return;\n  keys.forEach(function (key) {\n    object[key] = properties[key];\n  });\n};\n\nmodule.exports = Utils;\n\n//# sourceURL=webpack:///./src/Utils.js?");

/***/ })

/******/ });