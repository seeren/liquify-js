import { Event } from "./event";

export class Loop extends Event {

    /**
     * @constructor
     * @param {number} fps 
     */
    constructor(fps) {
        super();
        this.id;
        this.fps = fps || 30;
        this.trigger();
    }

    /**
     * @param {number} fps 
     */
    set fps(fps) {
        return this.ms = 1000 / fps;
    }

    /**
     * @returns {void}
     */
    trigger() {
        let interval;
        let now;
        let from = window.Date.now();
        this.trigger = () => {
            this.id = window.requestAnimationFrame(this.trigger);
            now = window.Date.now();
            interval = now - from;
            if (interval > this.ms) {
                this.listener.forEach(listener => listener());
                from = now - (interval % this.ms);
            }
        };
    }

    /**
     * @returns {void}
     */
    register() {
        return this.trigger();
    }

    /**
     * @returns {void}
     */
    unregister() {
        return this.id = window.cancelAnimationFrame(this.id);
    }

}
