export class Event {

    #callables = [];

    get callables() {
        return this.#callables;
    }

    /**
     * @param {Function} callable
     */
    attach(callable) {
        this.#callables.push(callable);
    }

    /**
     * @param {Function} callable
     */
    detach(callable) {
        const key = this.#callables.indexOf(callable);
        if (-1 < key) {
            this.callables.splice(key, 1);
        }
    }

    notify() {
        this.#callables.forEach((callable) => callable());
    }

    clear() {
        this.#callables.splice(0);
        this.unregister();
    }

}
