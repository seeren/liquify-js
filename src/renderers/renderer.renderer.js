import { WebGLRenderer } from 'three';

export class Renderer extends WebGLRenderer {

    /**
     * @constructor
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height) {
        super({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.setClearColor(0x000000, 0);
        this.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.resize(width, height)
    }

    /**
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        this.setSize(width, height);
    }

}