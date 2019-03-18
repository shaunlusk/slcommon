import SLEvent from './src/SLEvent';
import EventManager from './src/EventManager';
import EventNotifierMixin from './src/EventNotifierMixin';
import PriorityQueue from './src/PriorityQueue';
import Queue from './src/Queue';
import UniquePriorityQueue from './src/UniquePriorityQueue';
import Utils from './src/Utils';

if (typeof window !== 'undefined' && window) {
  window.SLEvent = SLEvent;
  window.EventManager = EventManager;
  window.EventNotifierMixin = EventNotifierMixin;
  window.PriorityQueue = PriorityQueue;
  window.Queue = Queue;
  window.UniquePriorityQueue = UniquePriorityQueue;
  window.Utils = Utils;
}
