import {
    Mesh, Raycaster, Vector2, Camera,
} from 'three';

import { Event } from '../event';

export class MouseEvent extends Event {

    #element;

    #mesh;

    #camera;

    #raycaster = new Raycaster();

    #mouse = new Vector2();

    /**
     * @param {MouseEvent} e
     */
    #handler = (e) => {
        const property = `on${this.property}`;
        if (this.#mesh && this.#camera) {
            this.#mouse.x = ((e.clientX - this.#element.offsetLeft)
                          / this.#element.offsetWidth) * 2 - 1;
            this.#mouse.y = -((e.clientY - this.#element.offsetTop)
                          / this.#element.offsetHeight) * 2 + 1;
            this.#raycaster.setFromCamera(this.#mouse, this.#camera);
            this.#raycaster.intersectObject(this.#mesh.parent).forEach(
                (intersectObject) => intersectObject.object.userData[property]
                && intersectObject.object.userData[property](intersectObject),
            );
        }
    };

    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        super();
        this.#element = element;
    }

    get handler() {
        return this.#handler;
    }

    get element() {
        return this.#element;
    }

    /**
     * @param {Mesh} cameshmera
     * @param {Camera} camera
     */
    setGeometry(mesh, camera) {
        this.#mesh = mesh;
        this.#camera = camera;
        return this;
    }

}
