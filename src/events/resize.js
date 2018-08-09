import { Event } from "./event";

export class Resize extends Event {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.trigger();
    }

    /**
     * @returns {void}
     */
    trigger() {
        let id;
        this.trigger = () => {
            window.clearTimeout(id);
            id = window.setTimeout(
                () => this.listener.forEach(listener => listener()),
                100
            );
        };
    }

    /**
     * @returns {void}
     */
    register() {
        return window.addEventListener("resize", this.trigger, false);
    }

    /**
     * @returns {void}
     */
    unregister() {
        return window.removeEventListener("resize", this.trigger);
    }

}
