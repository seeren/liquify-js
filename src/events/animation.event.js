import { Event } from './event';

export class AnimationEvent extends Event {

    #intervalId;

    #from;

    #now;

    #ms;

    #animate = () => {
        this.#intervalId = window.requestAnimationFrame(this.#animate);
        this.#now = window.Date.now();
        const interval = this.#now - this.#from;
        if (interval > this.#ms) {
            this.notify();
            this.#from = this.#now - (interval % this.#ms);
        }
    };

    constructor(fps = 30) {
        super();
        this.fps = fps;
        this.#from = window.Date.now();
    }

    /**
     * @param {Number} fps
     */
    set fps(fps) {
        this.#ms = 1000 / fps;
    }

    register() {
        this.#animate();
        return this;
    }

    unregister() {
        window.cancelAnimationFrame(this.#intervalId);
        return this;
    }

}
