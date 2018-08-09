import { Scene } from './scene';
import { Camera } from './camera';
import { Renderer } from './renderer';
import { Plane } from './subjects/plane';

export class World {

    /**
     * @constructor
     * @param {HTMLElement} node 
     */
    constructor(node) {
        let container = this.createContainer(node);
        this.camera = new Camera(container);
        this.camera.position.y = 1;
        this.scene = new Scene(new Plane(container, this.camera));
        this.camera.lookAt(this.scene.position);
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
        container.style.padding = 0;
        container.style.width = `${node.offsetWidth}px`;
        container.style.height = `${node.offsetHeight}px`;
        container.style.display = 'block';
        node.style.display = 'none';
        return node.parentNode.insertBefore(container, node);
    }

}
