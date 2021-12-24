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
        return this;
    }

    /**
     * @param {Function} callable
     */
    detach(callable) {
        const key = this.#callables.indexOf(callable);
        if (-1 < key) {
            this.callables.splice(key, 1);
        }
        return this;
    }

    notify() {
        this.#callables.forEach((callable) => callable());
        return this;
    }

    clear() {
        this.#callables.splice(0);
        this.unregister();
        return this;
    }

}
