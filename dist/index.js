"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Event", {
  enumerable: true,
  get: function () {
    return _Event.default;
  }
});
Object.defineProperty(exports, "EventManager", {
  enumerable: true,
  get: function () {
    return _EventManager.default;
  }
});
Object.defineProperty(exports, "EventNotifierMixin", {
  enumerable: true,
  get: function () {
    return _EventNotifierMixin.default;
  }
});
Object.defineProperty(exports, "PriorityQueue", {
  enumerable: true,
  get: function () {
    return _PriorityQueue.default;
  }
});
Object.defineProperty(exports, "Queue", {
  enumerable: true,
  get: function () {
    return _Queue.default;
  }
});
Object.defineProperty(exports, "UniquePriorityQueue", {
  enumerable: true,
  get: function () {
    return _UniquePriorityQueue.default;
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function () {
    return _Utils.Utils;
  }
});

var _Event = _interopRequireDefault(require("./src/Event"));

var _EventManager = _interopRequireDefault(require("./src/EventManager"));

var _EventNotifierMixin = _interopRequireDefault(require("./src/EventNotifierMixin"));

var _PriorityQueue = _interopRequireDefault(require("./src/PriorityQueue"));

var _Queue = _interopRequireDefault(require("./src/Queue"));

var _UniquePriorityQueue = _interopRequireDefault(require("./src/UniquePriorityQueue"));

var _Utils = _interopRequireWildcard(require("./src/Utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined' && window) {
  window.SL = window.SL || {};
  window.SL.Event = _Event.default;
  window.SL.EventManager = _EventManager.default;
  window.SL.EventNotifierMixin = _EventNotifierMixin.default;
  window.SL.PriorityQueue = _PriorityQueue.default;
  window.SL.Queue = _Queue.default;
  window.SL.UniquePriorityQueue = _UniquePriorityQueue.default;
  window.SL.Utils = _Utils.default;
}
