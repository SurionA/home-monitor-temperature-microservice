'use strict';

/**
 * @description Events Emitter
 * @param EventEmitter
 */
import { EventEmitter } from 'events';

/**
 * @description Hydrometry MongoDB schema
 * @param Hydrometry
 */
import Hydrometry from './hydrometry.model';

/**
 * @description Hydrometry Events Emitter
 * @param HydrometryEvents
 */
const HydrometryEvents = new EventEmitter();

HydrometryEvents.setMaxListeners(0);

/**
 * @description Events to listen on
 * @param events
 */
const events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

/**
 * @description Emit correct event on hooks
 */
for (const e in events) {
  const event = events[e];
  Hydrometry.schema.post(e, emitEvent(event));
}

/**
 * @description Emit correct event
 * @function emitEvent
 * @function emitEvent
 * @param event - Event to emit
 */
function emitEvent(event) {
  return (doc, options, done) => {
    HydrometryEvents.emit(event + ':' + doc._id, doc);
    HydrometryEvents.emit(event, doc);
    done(null);
  }
}

/**
 * @export HydrometryEvents
 * @default
 */
export default HydrometryEvents;
