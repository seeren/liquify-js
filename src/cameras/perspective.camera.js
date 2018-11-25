import { PerspectiveCamera } from 'three';

export class Perspective extends PerspectiveCamera {

    /**
     * @constructor
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height) {
        super(45, width / height, 0.1, 1000);
    }

    /**
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        this.aspect = width / height;
        this.updateProjectionMatrix();
    }

}