import { Scene as THREEScene } from 'three';
import { Plane } from './meshes/plane.mesh';

export class Scene extends THREEScene {

    /**
     * @constructor
     * @param {HTMLElement} element 
     * @param {Perspective} camera 
     */
    constructor(element, camera) {
        super();
        camera.position.y = 1;
        camera.lookAt(this.position);
    }

}