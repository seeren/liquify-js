import { Loop } from "./events/loop.event";
import { Resize } from "./events/resize.event";
import { Perspective } from './cameras/perspective.camera';
import { Scene } from './scenes/scene.scene';
import { Renderer } from './renderers/renderer.renderer';
import { Rasterize } from "./filters/rasterize.filter";

/**
 *     __
 *    / /__ __ __ __ __ __
 *   / // // // // // // /
 *  /_// // // // // // /
 *    /_//_//_//_//_//_/
 *
 * @author Cyril <consultant@seeren.fr>
 * @version 1.0.1
 */

/**
 * @type {string}
 */
const selector = `liquify`;

/**
 * @param {Loop} loop 
 * @param {Resize} resize 
 * @param {Filter} filter 
 * @returns {Object}
 */
const factory = (loop, resize, filter) => {
    return {
        get filter() {
            return filter;
        },
        play() {
            if (!this.loop.id) {
                this.resize.register();
                this.loop.register();
                return true;
            }
            return false;
        },
        stop() {
            if (this.loop.id) {
                this.resize.unregister();
                this.loop.unregister();
                return true;
            }
            return false;
        }

    }
};

export let liquify = global.liquify = new class {

    /**
     * @constructor
     */
    constructor() {
        window.addEventListener(`load`, () => this.upgrade());
    }

    /**
     * @returns {void} 
     */
    upgrade() {
        window.document.querySelectorAll(`[${selector}]`).forEach((node) => {
            let container = window.document.createElement(selector);
            if (node.id) {
                container.id = node.id;
            }
            if (node.className) {
                container.className = node.className;
            }
            if (node.style) {
                container.style = node.style;
            }
            container.style.display = `none`;
            this.render(node, container);
        });
    }

    /**
     * @param {HTMLElement} node 
     */
    render(node, container) {
        // TODO add wrap filter
        const loop = new Loop;
        const resize = new Resize;
        const rasterize = new Rasterize;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const camera = new Perspective(width, height);
        const renderer = new Renderer(width, height);
        const scene = new Scene(camera);
        // TODO add filter to Liquify
        container.appendChild(renderer.domElement);
        node.parentNode.insertBefore(container, node);
        node.Liquify = factory(loop, resize);
        // TODO limit event scoped members
        resize.attach(() => rasterize.render(node, camera, scene, renderer));
        loop.attach(() => renderer.render(scene, camera));
        resize.register();
        loop.register();
        resize.emit();
    }

}
