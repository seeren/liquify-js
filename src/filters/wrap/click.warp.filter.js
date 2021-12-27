import {
    Vector3, Mesh, Camera, Intersection, Face,
} from 'three';

import { EventManager } from '../../events/event.manager';
import { WarpFilter } from './warp.filter';

export class ClickWarpFilter extends WarpFilter {

    #event;

    #duration;

    #distance;

    #dynamicAmplitude;

    #intervalId;

    #mouseVector;

    #distanceMax;

    /**
     * @param {HTMLElement} target
     */
    constructor(target) {
        super();
        this.#event = EventManager.get('click', target).register();
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

    getCoeficient(index) {
        const distance = this.#mouseVector.distanceTo(new Vector3(
            this.verticeList[index],
            this.verticeList[index + 1],
            this.verticeList[index + 2],
        ));
        const coeficient = 1 - ((distance * this.#distance) / this.#distanceMax);
        return 0 > coeficient ? 0 : coeficient;
    }

    getAmplitude() {
        return this.#dynamicAmplitude;
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
        this.mesh.userData.onclick = (intersectObject) => this.#click(intersectObject);
    }

    /**
     * @param {Intersection} intersectObject
     */
    #click(intersectObject) {
        clearInterval(this.#intervalId);
        this.#setMouseVector(intersectObject.face);
        this.#setDistanceMax(this.#mouseVector);
        this.#dynamicAmplitude = this.amplitude;
        const decrement = this.#dynamicAmplitude / ((this.#duration / 50) * 1000);
        this.#intervalId = window.setInterval(() => {
            if (0 > this.#dynamicAmplitude) {
                this.#dynamicAmplitude = decrement;
                clearInterval(this.#intervalId);
                EventManager.get('animation').detach(this.handler);
            }
            this.#dynamicAmplitude -= decrement;
        }, 50);
        EventManager.get('animation').attach(this.handler);
        this.render(true);
    }

    /**
     * @param {Face} face
     */
    #setMouseVector(face) {
        const position = this.mesh.geometry.getAttribute('position');
        this.#mouseVector = new Vector3(
            position.getX(face.a),
            position.getY(face.a),
            position.getZ(face.a),
        );
    }

    /**
     * @param {Vector3} vector
     */
    #setDistanceMax(vector) {
        let distanceMax = 0;
        const verticeListLength = this.verticeList.length;
        for (let index = 0; index < verticeListLength; index += 3) {
            const distance = vector.distanceTo(new Vector3(
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

}
