import {
    Mesh, Raycaster, Vector2, Camera,
} from 'three';

import { Event } from './event';

export class ClickEvent extends Event {

    #raycaster = new Raycaster();

    #mouse = new Vector2();

    #element;

    #mesh;

    #camera;

    /**
     * @param {MouseEvent} e
     */
    #click = (e) => {
        if (this.#mesh && this.#camera) {
            this.#mouse.x = ((e.clientX - this.#element.offsetLeft)
                          / this.#element.offsetWidth) * 2 - 1;
            this.#mouse.y = -((e.clientY - this.#element.offsetTop)
                          / this.#element.offsetHeight) * 2 + 1;
            this.#raycaster.setFromCamera(this.#mouse, this.#camera);
            this.#raycaster.intersectObject(this.#mesh.parent).forEach(
                (intersectObject) => intersectObject.object.userData.onclick
                && intersectObject.object.userData.onclick(intersectObject),
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

    /**
     * @param {Mesh} cameshmera
     * @param {Camera} camera
     */
    setGeometry(mesh, camera) {
        this.#mesh = mesh;
        this.#camera = camera;
    }

    register() {
        this.#element.addEventListener('click', this.#click);
    }

    unregister() {
        this.#element.removeEventListener('click', this.#click);
    }

}
