import { Event } from "./event";

export class Resize extends Event {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.emit();
    }

    /**
     * @returns {this}
     */
    register() {
        window.addEventListener(`resize`, this.emit);
        return this;
    }

    /**
     * @returns {this}
     */
    unregister() {
        window.removeEventListener(`resize`, this.emit);
        return this;
    }

    /**
     * @returns {void}
     */
    emit() {
        let timeout = 0;
        this.emit = () => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(
                () => this.callables.forEach(callable => callable()),
                100
            );
        };
    }

}