import { PerspectiveCamera } from './cameras/perspective.camera';
import { AnimationEvent } from './events/animation.event';
import { ResizeEvent } from './events/resize.event';
import { WebGLRenderer } from './renderers/renderer.renderer';
import { LiquifyScene } from './scenes/liquify.scene';
import { RasterizeFilter } from './filters/rasterize.filter';
import { ElementBuilder } from './builder/element.builder';

export class Liquify {

    #resizeEvent = new ResizeEvent();

    #anmationEvent = new AnimationEvent();

    #rasterizeFilter = new RasterizeFilter();

    #builder = new ElementBuilder();

    constructor() {
        this.upgrade();
    }

    upgrade() {
        this.#resizeEvent.clear();
        this.#anmationEvent.clear();
        const liquifyList = window.document.querySelectorAll('[data-liquify]');
        if (liquifyList.length) {
            this.#resizeEvent.register();
            this.#anmationEvent.register();
            liquifyList.forEach((target) => {
                const liquify = window.document.createElement('liquify');
                if (target.className) {
                    liquify.className = target.className;
                }
                if (target.style) {
                    liquify.style = target.style;
                }
                liquify.style.display = 'none';
                target.parentNode.insertBefore(liquify, target.nextSibling);
                this.#builder.build(target);
                this.#render(target, liquify);
            });
        }
    }

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} liquify
     */
    async #render(target, liquify) {
        const canvas = await this.#rasterizeFilter.render(target, liquify);
        const renderer = new WebGLRenderer(liquify);
        const camera = new PerspectiveCamera(liquify);
        const scene = new LiquifyScene(camera, liquify, canvas.toDataURL());
        target.Liquify.mesh = scene.plane;
        this.#resizeEvent.attach(async () => {
            const resized = await this.#rasterizeFilter.resize(target, liquify);
            renderer.resize(liquify);
            camera.resize(liquify);
            scene.resize(camera, liquify, resized.toDataURL());
            target.Liquify.resize(scene.plane);
        });
        this.#anmationEvent.attach(() => {
            target.Liquify.render();
            renderer.render(scene, camera);
        });
    }

}
