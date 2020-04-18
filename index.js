import Event from './src/Event';
import EventManager from './src/EventManager';
import EventNotifierMixin from './src/EventNotifierMixin';
import PriorityQueue from './src/PriorityQueue';
import Queue from './src/Queue';
import UniquePriorityQueue from './src/UniquePriorityQueue';
import Utils from './src/Utils';

if (typeof self !== 'undefined' && self) {
  self.SL = self.SL || {};
  self.SL.Event = Event;
  self.SL.EventManager = EventManager;
  self.SL.EventNotifierMixin = EventNotifierMixin;
  self.SL.PriorityQueue = PriorityQueue;
  self.SL.Queue = Queue;
  self.SL.UniquePriorityQueue = UniquePriorityQueue;
  self.SL.Utils = Utils;
}
