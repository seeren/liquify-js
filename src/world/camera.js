export class Camera extends THREE.PerspectiveCamera {

    /**
     * @constructor
     * @param {HTMLElement} container 
     */
    constructor(container) {
        super(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    }

}
