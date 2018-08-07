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
        this.play();
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
    play() {
        let interval;
        let now;
        let from = window.Date.now();
        this.play = () => {
            this.id = window.requestAnimationFrame(this.play);
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
    stop() {
        return window.cancelAnimationFrame(this.id);
    }

}
