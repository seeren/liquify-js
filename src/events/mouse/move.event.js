import { MouseEvent } from './mouse.event';

export class MoveEvent extends MouseEvent {

    get property() {
        return 'mousemove';
    }

    register() {
        this.element.addEventListener(this.property, this.handler);
        return this;
    }

    unregister() {
        this.element.removeEventListener(this.property, this.handler);
        return this;
    }

}
