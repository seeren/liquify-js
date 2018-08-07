export class Event {

    /**
     * @constructor
     */
    constructor() {
        this.listener = [];
    }

    /**
     * @param {Function} listener 
     */
    bind(listener) {
        return this.listener.push(listener);
    }

    /**
     * @param {Function} listener 
     */
    unbind(listener) {
        let index = this.listener.indexOf(listener);
        if (index > -1) {
            this.listener.splice(index, 1);
            return true;
        }
    }

}
