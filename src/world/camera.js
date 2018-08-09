import { PerspectiveCamera as THREEPerspectiveCamera} from 'three';

export class Camera extends THREEPerspectiveCamera {

    /**
     * @constructor
     * @param {HTMLElement} container 
     */
    constructor(container) {
        super(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    }

}
