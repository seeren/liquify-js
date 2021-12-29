import { Mesh, Camera, Intersection } from 'three';

import { EventManager } from '../../events/event.manager';
import { MouseWrapFilter } from './mouse.wrap.filter';
import { MouseService } from './shared/mouse.service';

export class MoveWarpFilter extends MouseWrapFilter {

    /**
     * @param {HTMLElement} target
     */
    constructor(target) {
        super(EventManager.get('move', target).register());
    }

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     */
    setGeometry(mesh, camera) {
        super.setGeometry(mesh);
        this.event.setGeometry(mesh, camera);
        this.mesh.userData.onmousemove = (intersectObject) => {
            const handler = this.mesh.userData.onmousemove;
            this.mesh.userData.onmousemove = null;
            window.setTimeout(() => {
                this.mesh.userData.onmousemove = handler;
                this.#move(intersectObject);
            }, 100);
        };

    }

    /**
     * @param {Intersection} intersectObject
     */
    #move(intersectObject) {
        const mouse = MouseService.create(
            this.mesh,
            intersectObject.face,
            this.verticeList,
            this.amplitude,
        );
        this.mouseList.push(mouse);
        const increment = mouse.amplitude / ((1 / 50) * 1000);
        const decrement = mouse.amplitude / ((this.duration / 50) * 1000);
        const maxAmplitude = mouse.amplitude;
        mouse.amplitude = 0;
        let intervalId = window.setInterval(() => {
            if (mouse.amplitude > maxAmplitude) {
                clearInterval(intervalId);
                intervalId = window.setInterval(() => {
                    if (decrement > mouse.amplitude) {
                        clearInterval(intervalId);
                        this.mouseList.splice(this.mouseList.indexOf(mouse), 1);
                        if (!this.mouseList.length) {
                            EventManager.get('animation').detach(this.handler);
                        }
                    }
                    mouse.amplitude -= decrement;
                }, 50);
            }
            mouse.amplitude += increment;
        }, 50);

        EventManager.get('animation').attach(this.handler);
    }

}
