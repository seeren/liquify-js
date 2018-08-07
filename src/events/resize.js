import { Event } from "./event";

export class Resize extends Event {

    /**
     * @constructor
     * @param {World} world 
     */
    constructor(world) {
        super();
        this.handler(world.scene, world.camera, world.renderer);
    }

    /**
     * @param {Scene} scene 
     * @param {Camera} camera 
     * @param {Renderer} renderer 
     */
    handler(scene, camera, renderer) {
        this.handler = () => {
            let width = renderer.domElement.parentNode.offsetWidth;
            let height = renderer.domElement.parentNode.offsetHeight;
            if (!width || !height) {
                return this.unregister();
            }
            camera.aspect = width / height;
            renderer.setSize(width, height);
            camera.updateProjectionMatrix();
            this.listener.forEach(listener => listener());
        };
    }

    /**
     * @returns {void}
     */
    register() {
        return window.addEventListener("resize", this.handler, false);
    }

    /**
     * @returns {void}
     */
    unregister() {
        return window.removeEventListener("resize", this.handler);
    }

}
