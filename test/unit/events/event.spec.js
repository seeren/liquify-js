import { describe, beforeEach, it } from 'mocha';
import { assert } from 'chai';

import { Event } from '../../../src/events/event';

describe('Event', () => {

    let event;

    let callback;

    beforeEach(() => {
        event = new Event();
        callback = () => true;
    });

    describe('attach(callable)', () => {
        it('Add callable to collection', () => {
            event.attach(callback);
            assert.equal(event.callables.length, 1);
        });
    });

    describe('attach(callable)', () => {
        it('Remove callable to collection', () => {
            event.detach(callback);
            assert.equal(event.callables.length, 0);
        });
    });

});
