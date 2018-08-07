import { Scene } from './scene';
import { Camera } from './camera';
import { Renderer } from './renderer';
import { Plane } from './plane';

export class World {

    /**
     * @constructor
     * @param {HTMLElement} node 
     */
    constructor(node) {
        let container = this.createContainer(node);
        this.camera = new Camera(container);
        this.scene = new Scene(container, this.camera);
        this.renderer = new Renderer(container);
        container.appendChild(this.renderer.domElement);
    }

    /**
     * @param {HTMLElement} node
     * @returns {HTMLElement}
     */
    createContainer(node) {
        let container = window.document.createElement('liquify');
        container.id = node.id;
        container.className = node.className;
        container.style = node.style;
        container.style.display = 'block';
        node.style.display = 'none';
        return node.parentNode.insertBefore(container, node);
    }

}