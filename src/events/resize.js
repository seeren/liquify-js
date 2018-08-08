import { Event } from "./event";

export class Resize extends Event {

    /**
     * @constructor
     * @param {World} world 
     */
    constructor(world) {
        super();
        this.id;
        this.handler(world.scene, world.camera, world.renderer);
    }

    /**
     * @param {Scene} scene 
     * @param {Camera} camera 
     * @param {Renderer} renderer 
     */
    handler(scene, camera, renderer) {
        this.handler = () => {
            window.clearTimeout(this.id);
            this.id = window.setTimeout(
                () => this.listener.forEach(listener => listener()),
                100
            );
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
