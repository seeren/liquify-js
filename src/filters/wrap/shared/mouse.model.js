import { Vector3 } from 'three';

export class Mouse {

    #vector;

    #distanceMax;

    #amplitude;

    get vector() {
        return this.#vector;
    }

    /**
     * @param {Vector3}
     */
    set vector(vector) {
        this.#vector = vector;
    }

    get distanceMax() {
        return this.#distanceMax;
    }

    /**
     * @param {Number}
     */
    set distanceMax(distanceMax) {
        this.#distanceMax = distanceMax;
    }

    get amplitude() {
        return this.#amplitude;
    }

    /**
     * @param {Number}
     */
    set amplitude(amplitude) {
        this.#amplitude = amplitude;
    }

}
