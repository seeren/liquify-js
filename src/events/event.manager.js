import { AnimationEvent } from './animation.event';
import { Event } from './event';
import { ResizeEvent } from './resize.event';

export class EventManager {

    static resize = 'resize';

    static animation = 'animation';

    static #eventList = new Map();

    /**
     * @param {String} eventName
     * @returns {Event}
     */
    static get(eventName) {
        if (this.#eventList.has(eventName)) {
            return this.#eventList.get(eventName);
        }
        switch (eventName) {
        case this.resize:
            return this.#eventList.set(eventName, new ResizeEvent()).get(eventName);
        case this.animation:
            return this.#eventList.set(eventName, new AnimationEvent()).get(eventName);
        default:
            throw new Error(`The event "${eventName}" do not exists`);
        }
    }

    static clear() {
        this.#eventList.forEach((event) => event.clear());
    }

}
