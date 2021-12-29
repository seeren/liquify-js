import { PerspectiveCamera } from './cameras/perspective.camera';
import { WebGLRenderer } from './renderers/renderer.renderer';
import { LiquifyScene } from './scenes/liquify.scene';
import { RasterizeFilter } from './filters/rasterize.filter';
import { ElementBuilder } from './builder/element.builder';
import { EventManager } from './events/event.manager';

export class Liquify {

    #rasterizeFilter = new RasterizeFilter();

    #builder = new ElementBuilder();

    constructor() {
        this.upgrade();
    }

    async upgrade() {
        return new Promise((resolve) => {
            EventManager.clear();
            window.document.querySelectorAll('liquify').forEach((liquify) => liquify.parentNode.removeChild(liquify));
            const targetList = window.document.querySelectorAll('[data-liquify]');
            if (targetList.length) {
                EventManager.get('resize').register();
                EventManager.get('animation').register();
                targetList.forEach(async (target) => {
                    const liquify = window.document.createElement('liquify');
                    target.parentNode.insertBefore(liquify, target.nextSibling);
                    this.#builder.build(target, liquify);
                    this.#register(target, liquify);
                    const liquifyList = document.querySelectorAll('liquify');
                    if (targetList.length === liquifyList.length) {
                        resolve(liquifyList);
                    }
                });
            }
        });
    }

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} liquify
     */
    async #register(target, liquify) {
        const canvas = await this.#rasterizeFilter.render(target, liquify);
        const renderer = new WebGLRenderer(liquify);
        const camera = new PerspectiveCamera(liquify);
        const scene = new LiquifyScene(camera, liquify, canvas.toDataURL());
        target.Liquify.setGeometry(scene.plane, camera);
        this.#registerResize(target, liquify, renderer, scene, camera);
        this.#registerRender(renderer, scene, camera);
    }

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} liquify
     * @param {WebGLRenderer} renderer
     * @param {LiquifyScene} scene
     * @param {PerspectiveCamera} camera
     */
    #registerResize(target, liquify, renderer, scene, camera) {
        EventManager.get('resize').attach(async () => {
            const resized = await this.#rasterizeFilter.resize(target, liquify);
            renderer.resize(liquify);
            camera.resize(liquify);
            scene.resize(camera, liquify, resized.toDataURL());
            target.Liquify.resize(scene.plane, camera);
        });
    }

    /**
     * @param {WebGLRenderer} renderer
     * @param {LiquifyScene} scene
     * @param {PerspectiveCamera} camera
     */
    #registerRender(renderer, scene, camera) {
        EventManager.get('animation').attach(() => renderer.render(scene, camera));
    }

}
