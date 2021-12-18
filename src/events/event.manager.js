import { AnimationEvent } from './animation.event';
import { ClickEvent } from './click.event';
import { Event } from './event';
import { ResizeEvent } from './resize.event';

export class EventManager {

    static resize = 'resize';

    static animation = 'animation';

    static click = 'click';

    static #eventList = new Map();

    /**
     * @param {String} eventName
     * @param {HTMLElement} target
     * @returns {Event}
     */
    static get(eventName, target = null) {
        if (!target && this.#eventList.has(eventName)) {
            return this.#eventList.get(eventName);
        }
        if (this.#eventList.has(eventName)) {
            return this.#eventList.get(eventName).get(target);
        }
        switch (eventName) {
        case this.resize:
            return this.#eventList.set(eventName, new ResizeEvent()).get(eventName);
        case this.animation:
            return this.#eventList.set(eventName, new AnimationEvent()).get(eventName);
        case this.click:
            if (!this.#eventList.has(eventName)) {
                this.#eventList.set(eventName, new Map());
            }
            return this.#eventList
                .get(eventName)
                .set(target, new ClickEvent(target))
                .get(target);
        default:
            throw new Error(`The event "${eventName}" do not exists`);
        }
    }

    static clear() {
        this.#eventList.forEach((event) => {
            if (event instanceof Event) {
                return event.clear();
            }
            if (event instanceof Map) {
                event.forEach((subEvent) => subEvent.clear());
                event.clear();
            }
        });
    }

}
