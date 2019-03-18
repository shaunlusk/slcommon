import Event from './src/Event';
import EventManager from './src/EventManager';
import EventNotifierMixin from './src/EventNotifierMixin';
import PriorityQueue from './src/PriorityQueue';
import Queue from './src/Queue';
import UniquePriorityQueue from './src/UniquePriorityQueue';
import Utils from './src/Utils';

if (typeof window !== 'undefined' && window) {
  window.SL = window.SL || {};
  window.SL.Event = Event;
  window.SL.EventManager = EventManager;
  window.SL.EventNotifierMixin = EventNotifierMixin;
  window.SL.PriorityQueue = PriorityQueue;
  window.SL.Queue = Queue;
  window.SL.UniquePriorityQueue = UniquePriorityQueue;
  window.SL.Utils = Utils;
}
