import { Mesh } from 'three';

import { Filter } from '../filter';

export class WarpFilter extends Filter {

    #increment = 0;

    #frequency = 0;

    #radian = 0;

    #amplitude = 0;

    #verticeList;

    #mesh;

    #handler = () => this.render();

    get increment() {
        return this.#increment;
    }

    /**
     * @param {Number} frequency
     */
    set increment(increment) {
        this.#increment = increment;
    }

    get frequency() {
        return this.#frequency;
    }

    /**
     * @param {Number} frequency
     */
    set frequency(frequency) {
        this.#frequency = window.parseFloat(frequency);
    }

    get radian() {
        return this.#radian;
    }

    /**
     * @param {Number} degree
     */
    set degree(degree) {
        this.#radian = window.parseFloat(degree / 3) * (Math.PI / 180);
    }

    get amplitude() {
        return this.#amplitude * 10;
    }

    /**
     * @param {Number} amplitude
     */
    set amplitude(amplitude) {
        this.#amplitude = window.parseFloat(amplitude) / 10;
    }

    get verticeList() {
        return this.#verticeList;
    }

    get mesh() {
        return this.#mesh;
    }

    get handler() {
        return this.#handler;
    }

    /**
     * @param {Mesh} mesh
     */
    resize(mesh) {
        this.setGeometry(mesh);
    }

    /**
     * @param {Mesh} mesh
     */
    setGeometry(mesh) {
        this.#verticeList = mesh.geometry.getAttribute('position').array.slice(0);
        this.#mesh = mesh;
    }

}
