import { MouseEvent } from './mouse.event';

export class ClickEvent extends MouseEvent {

    get property() {
        return 'click';
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
