import { Scene as THREEScene } from 'three';
import { Plane } from './meshes/plane.mesh';

export class Scene extends THREEScene {

    /**
     * @constructor
     * @param {Perspective} camera 
     */
    constructor(camera) {
        super();
        camera.position.y = 1;
        camera.lookAt(this.position);
    }

    /**
     * @param {number} width 
     * @param {number} height 
     * @param {Perspective} camera 
     * @param {string} image 
     */
    resize(width, height, camera, image) {
        if (this.plane) {
            this.remove(this.plane);
        }
        this.plane = new Plane(width, height, camera, image);
        this.add(this.plane);
    }

}