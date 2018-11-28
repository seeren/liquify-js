import { PerspectiveCamera } from 'three';

export class Perspective extends PerspectiveCamera {

    /**
     * @constructor
     * @param {HTMLElement} element 
     */
    constructor(element) {
        super(45, element.offsetWidth / element.offsetHeight, 0.1, 100);
    }

    /**
     * @param {HTMLElement} element 
     */
    resize(element) {
        this.aspect = element.offsetWidth / element.offsetHeight;
        this.updateProjectionMatrix();
    }

}