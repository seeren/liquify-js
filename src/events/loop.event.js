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
        this.emit();
    }

    /**
     * @param {number} fps 
     * @returns {number}
     */
    set fps(fps) {
        return this.ms = 1000 / fps;
    }

    /**
     * @returns {this}
     */
    register() {
        this.id = window.requestAnimationFrame(this.emit);
        return this;
    }

    /**
     * @returns {this}
     */
    unregister() {
        this.id = window.cancelAnimationFrame(this.id);
        return this;
    }

    /**
     * @returns {void}
     */
    emit() {
        let interval;
        let now;
        let from = window.Date.now();
        this.emit = () => {
            this.id = window.requestAnimationFrame(this.emit);
            now = window.Date.now();
            interval = now - from;
            if (interval > this.ms) {
                this.callables.forEach(callable => callable());
                from = now - (interval % this.ms);
            }
        };
    }

}