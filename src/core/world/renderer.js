export class Renderer extends THREE.WebGLRenderer {

    /**
     * @constructor
     * @param {HTMLElement} container 
     */
    constructor(container) {
        super({
            antialias: true,
            alpha: true
        });
        this.setSize(container.offsetWidth, container.offsetHeight);
        this.setClearColor(0x000000, 0);
    }

}
