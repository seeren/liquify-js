import { Scene as THREEScene } from "three";
import { Plane } from "./meshes/plane.mesh";

export class Scene extends THREEScene {

    /**
     * @constructor
     * @param {Perspective} camera 
     */
    constructor(camera) {
        super();
        camera.position.y = 1;
        camera.lookAt(this.position);

        /**
         * @param {HTMLElement} element 
         * @param {string} src 
         */
        this.resize = (element, src) => {
            if (this.plane) {
                this.remove(this.plane);
            }
            this.plane = new Plane(camera, element, src);
            this.add(this.plane);
        };

    }

}