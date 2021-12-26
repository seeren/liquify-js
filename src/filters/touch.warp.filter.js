import {
    Vector3, Mesh, Camera, Intersection, Face,
} from 'three';

import { EventManager } from '../events/event.manager';
import { WarpFilter } from './warp.filter';

export class TouchWarpFilter extends WarpFilter {

    #event;

    #duration;

    #distance;

    #dynamicSize;

    #intervalId;

    #mouseVector;

    #distanceMax;

    /**
     * @param {HTMLElement} target
     */
    constructor(target) {
        super();
        this.#event = EventManager.get('click', target);
        this.#event.register();
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
     * @param {Face} face
     */
    #setVector(face) {
        let distanceMax = 0;
        const position = this.mesh.geometry.getAttribute('position');
        const verticeListLength = this.verticeList.length;
        this.#mouseVector = new Vector3(
            position.getX(face.a),
            position.getY(face.a),
            position.getZ(face.a),
        );
        for (let index = 0; index < verticeListLength; index += 3) {
            const distance = this.#mouseVector.distanceTo(new Vector3(
                this.verticeList[index],
                this.verticeList[index + 1],
                this.verticeList[index + 2],
            ));
            if (distance > distanceMax) {
                distanceMax = distance;
            }
        }
        this.#distanceMax = distanceMax;
    }

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     */
    resize(mesh, camera) {
        this.setGeometry(mesh, camera);
    }

    render() {
        let coeficient;
        this.increment += this.frequency;
        const position = this.mesh.geometry.getAttribute('position').array;
        const positionLength = position.length;
        for (let index = 0; index < positionLength; index += 3) {
            const distance = this.#mouseVector.distanceTo(new Vector3(
                this.verticeList[index],
                this.verticeList[index + 1],
                this.verticeList[index + 2],
            ));
            coeficient = 1 - ((distance * this.#distance) / this.#distanceMax);
            if (0 > coeficient) {
                coeficient = 0;
            }
            const z = index + 2;
            position[z] = (this.verticeList[z] + (
                this.#dynamicSize * window.Math.cos(this.increment + index * this.radian)
            )) * coeficient;
        }
        this.mesh.geometry.attributes.position.needsUpdate = true;
    }

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     */
    setGeometry(mesh, camera) {
        super.setGeometry(mesh);
        this.#event.setGeometry(mesh, camera);
        this.mesh.userData.onclick = (intersectObject) => this.#click(intersectObject);
    }

    /**
     * @param {Intersection} intersectObject
     */
    #click(intersectObject) {
        clearInterval(this.#intervalId);
        this.#setVector(intersectObject.face);
        this.#dynamicSize = this.size;
        const decrement = this.#dynamicSize / ((this.#duration / 50) * 1000);
        this.#intervalId = window.setInterval(() => {
            if (0 > this.#dynamicSize) {
                this.#dynamicSize = decrement;
                clearInterval(this.#intervalId);
                EventManager.get('animation').detach(this.handler);
            }
            this.#dynamicSize -= decrement;
        }, 50);
        EventManager.get('animation').attach(this.handler);
        this.render(true);
    }

}
