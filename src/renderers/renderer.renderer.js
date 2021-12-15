import { WebGLRenderer as ThreeWebGLRenderer } from 'three';

export class WebGLRenderer extends ThreeWebGLRenderer {

    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        super({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
        });
        this.setClearColor(0x000000, 0);
        this.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.resize(element);
        element.appendChild(this.domElement);
    }

    /**
     * @param {HTMLElement} element
     */
    resize(element) {
        this.setSize(element.offsetWidth, element.offsetHeight);
    }

}
