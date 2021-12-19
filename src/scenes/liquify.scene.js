import { Camera, Scene } from 'three';

import { Plane } from './meshes/plane.mesh';

export class LiquifyScene extends Scene {

    #plane;

    /**
     * @param {Camera} camera
     * @param {HTMLElement} element
     * @param {String} src
     */
    constructor(camera, element, src) {
        super();
        camera.position.y = 1;
        camera.lookAt(this.position);
        this.#plane = new Plane(camera, element, src);
        this.add(this.#plane);
    }

    get plane() {
        return this.#plane;
    }

    /**
     * @param {HTMLElement} element
     * @param {String} src
     */
    resize(camera, element, src) {
        this.remove(this.#plane);
        this.#plane = new Plane(camera, element, src);
        this.add(this.#plane);
    }

}
