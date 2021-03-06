import { Loop } from "./events/loop.event";
import { Resize } from "./events/resize.event";
import { Perspective } from "./cameras/perspective.camera";
import { Scene } from "./scenes/scene.scene";
import { Renderer } from "./renderers/renderer.renderer";
import { Rasterize } from "./filters/rasterize.filter";
import { WarpFilter } from "./filters/warp.filter";

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

export let liquify = global.liquify = new class {

    /**
     * @constructor
     */
    constructor() {
        window.addEventListener("load", () => this.upgrade());
    }

    /**
     * @returns {void} 
     */
    upgrade() {
        window.document.querySelectorAll("[liquify]").forEach((node) => {
            const filter = new WarpFilter;
            const container = window.document.createElement("liquify");
            filter.frequency = this.getAttribute(node, "liquify.frequency", 0.5);
            filter.degree = this.getAttribute(node, "liquify.degree", 55);
            filter.amplitude = this.getAttribute(node, "liquify.amplitude", 0.5);
            container.className = node.className || "";
            container.style = node.style;
            container.style.display = "none";
            this.render(node, container, filter);
        });
    }

    /**
     * @param {HTMLElement} element 
     * @param {string} name 
     * @param {float} defaultValue 
     */
    getAttribute(element, name, defaultValue) {
        return window.parseFloat(element.getAttribute(name)) || defaultValue;
    }

    /**
     * @param {HTMLElement} node 
     * @param {HTMLElement} container 
     * @param {Object} filter 
     */
    render(node, container, filter) {
        const rasterize = new Rasterize;
        const camera = new Perspective(node);
        const renderer = new Renderer(node);
        const scene = new Scene(camera);
        container.appendChild(renderer.domElement);
        node.parentNode.insertBefore(container, node.nextSibling);
        node.Liquify = filter;
        (new Resize).attach(() => rasterize.render(node, container, (canvas) => {
            camera.resize(node);
            renderer.resize(node);
            scene.resize(node, canvas.toDataURL());
            filter.resize(scene.plane);
        })).register().emit();
        (new Loop).attach(() => {
            filter.render();
            renderer.render(scene, camera);
        }).register();
    }

};