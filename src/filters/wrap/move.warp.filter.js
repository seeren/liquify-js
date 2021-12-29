import { Mesh, Camera, Intersection } from 'three';

import { EventManager } from '../../events/event.manager';
import { MouseService } from './shared/mouse.service';
import { WarpFilter } from './warp.filter';

export class MoveWarpFilter extends WarpFilter {

    #event;

    #duration;

    #distance;

    #mouseList = [];

    /**
     * @param {HTMLElement} target
     */
    constructor(target) {
        super();
        this.#event = EventManager.get('move', target).register();
    }

    /**
     * @param {Number} duration
     */
    set duration(duration) {
        this.#duration = duration;
    }

    /**
     * @param {Number} distance
     */
    set distance(distance) {
        this.#distance = (10 - (10 * (distance / 100))) + 1;
    }

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     */
    resize(mesh, camera) {
        this.setGeometry(mesh, camera);
    }

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     */
    setGeometry(mesh, camera) {
        super.setGeometry(mesh);
        this.#event.setGeometry(mesh, camera);
        this.mesh.userData.onmousemove = (intersectObject) => {
            const handler = this.mesh.userData.onmousemove;
            this.mesh.userData.onmousemove = null;
            window.setTimeout(() => {
                this.mesh.userData.onmousemove = handler;
                this.#move(intersectObject);
            }, 100);
        };

    }

    render() {
        this.increment += this.frequency;
        const position = this.mesh.geometry.getAttribute('position').array;
        const positionLength = position.length;
        for (let index = 0; index < positionLength; index += 3) {
            let coeficient = 0;
            let amplitude = 0;
            this.#mouseList.forEach((mouse) => {
                const mouseCoeficient = MouseService.getCoeficient(
                    this.verticeList,
                    mouse,
                    this.#distance,
                    index,
                );
                if (mouseCoeficient > coeficient && mouse.amplitude > amplitude) {
                    amplitude = mouse.amplitude;
                }
                if (coeficient < mouseCoeficient) {
                    coeficient = mouseCoeficient;
                }
            });
            const z = index + 2;
            position[z] = (this.verticeList[z]
                        + (amplitude * window.Math.cos(
                            this.increment + index * this.radian,
                        ))) * coeficient;
        }
        this.mesh.geometry.attributes.position.needsUpdate = true;
    }

    /**
     * @param {Intersection} intersectObject
     */
    #move(intersectObject) {
        const mouse = MouseService.create(
            this.mesh,
            intersectObject.face,
            this.verticeList,
            this.amplitude / 10,
        );
        this.#mouseList.push(mouse);
        const increment = mouse.amplitude / ((1 / 50) * 1000);
        const decrement = mouse.amplitude / ((this.#duration / 50) * 1000);
        const maxAmplitude = mouse.amplitude;
        mouse.amplitude = 0;
        let intervalId = window.setInterval(() => {
            if (mouse.amplitude > maxAmplitude) {
                clearInterval(intervalId);
                intervalId = window.setInterval(() => {
                    if (decrement > mouse.amplitude) {
                        clearInterval(intervalId);
                        this.#mouseList.splice(this.#mouseList.indexOf(mouse), 1);
                        if (!this.#mouseList.length) {
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
