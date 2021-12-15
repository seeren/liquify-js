import { Event } from './event';

export class ResizeEvent extends Event {

    #timeoutId;

    #resize = () => {
        window.clearTimeout(this.#timeoutId);
        this.#timeoutId = window.setTimeout(() => this.notify(), 100);
    };

    register() {
        window.addEventListener('resize', this.#resize);
    }

    unregister() {
        window.removeEventListener('resize', this.#resize);
    }

}
