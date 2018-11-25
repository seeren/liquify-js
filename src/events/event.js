export class Event {

    /**
     * @constructor
     */
    constructor() {
        this.callables = [];
    }

    /**
     * @param {Function} callable 
     * @returns {this}
     */
    attach(callable) {
        this.callables.push(callable);
        return this;
    }

    /**
     * @param {Function} callable 
     * @returns {this}
     */
    detach(callable) {
        const key = this.callables.indexOf(callable);
        if (-1 < key) {
            this.callables.splice(key, 1);
        }
        return this;
    }

}