import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

export class PerspectiveCamera extends ThreePerspectiveCamera {

    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        super(45, element.offsetWidth / element.offsetHeight, 0.1, 50);
    }

    /**
     * @param {HTMLElement} element
     */
    resize(element) {
        this.aspect = element.offsetWidth / element.offsetHeight;
        this.updateProjectionMatrix();
    }

}
