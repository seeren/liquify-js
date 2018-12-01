import {
    WebGLRenderer,
    Color
} from "three";

export class Renderer extends WebGLRenderer {

    /**
     * @constructor
     * @param {HTMLElement} element 
     */
    constructor(element) {
        super({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.setClearColor(new Color("#000000"), 0);
        this.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.resize(element);
    }

    /**
     * @param {HTMLElement} element 
     */
    resize(element) {
        this.setSize(element.offsetWidth, element.offsetHeight);
    }

}