import { Mesh, Camera, Intersection } from 'three';

import { EventManager } from '../../events/event.manager';
import { MouseWrapFilter } from './mouse.wrap.filter';
import { MouseService } from './shared/mouse.service';

export class ClickWarpFilter extends MouseWrapFilter {

    /**
     * @param {HTMLElement} target
     */
    constructor(target) {
        super(EventManager.get('click', target).register());
    }

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     */
    setGeometry(mesh, camera) {
        super.setGeometry(mesh);
        this.event.setGeometry(mesh, camera);
        this.mesh.userData.onclick = (intersectObject) => this.#click(intersectObject);
    }

    /**
     * @param {Intersection} intersectObject
     */
    #click(intersectObject) {
        const mouse = MouseService.create(
            this.mesh,
            intersectObject.face,
            this.verticeList,
            this.amplitude,
        );
        this.mouseList.push(mouse);
        const decrement = mouse.amplitude / ((this.duration / 50) * 1000);
        const intervalId = window.setInterval(() => {
            if (decrement > mouse.amplitude) {
                clearInterval(intervalId);
                this.mouseList.splice(this.mouseList.indexOf(mouse), 1);
                if (!this.mouseList.length) {
                    EventManager.get('animation').detach(this.handler);
                }
            }
            mouse.amplitude -= decrement;
        }, 50);
        EventManager.get('animation').attach(this.handler);
    }

}
