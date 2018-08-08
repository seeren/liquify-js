export class Renderer extends THREE.WebGLRenderer {

    /**
     * @constructor
     * @param {HTMLElement} container 
     */
    constructor(container) {
        super({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.setClearColor(0x000000, 0);
        this.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.setSize(container.offsetWidth, container.offsetHeight);
    }

}
