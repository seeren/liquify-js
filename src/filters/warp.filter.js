import { BufferGeometry } from 'three';

import { Filter } from './filter';

export class WarpFilter extends Filter {

    #increment = 0;

    #frequency = 0;

    #radian = 0;

    #size = 0;

    #verticeList;

    #geometry;

    get increment() {
        return this.#increment;
    }

    set increment(increment) {
        this.#increment = increment;
    }

    get frequency() {
        return this.#frequency;
    }

    set frequency(frequency) {
        this.#frequency = window.parseFloat(frequency);
    }

    get radian() {
        return this.#radian;
    }

    get degree() {
        return this.#radian * 3 * (180 / Math.PI);
    }

    set degree(degree) {
        this.#radian = window.parseFloat(degree / 3) * (Math.PI / 180);
    }

    get size() {
        return this.#size;
    }

    get amplitude() {
        return this.#size * 10;
    }

    set amplitude(amplitude) {
        this.#size = window.parseFloat(amplitude) / 10;
    }

    get verticeList() {
        return this.#verticeList;
    }

    get geometry() {
        return this.#geometry;
    }

    /**
     * @param {BufferGeometry} geometry
     */
    setGeometry(geometry) {
        this.#verticeList = geometry.getAttribute('position').array.slice(0);
        this.#geometry = geometry;
    }

    /**
     * @param {BufferGeometry} geometry
     */
    resize(geometry) {
        this.setGeometry(geometry);
    }

}
