import { Mesh } from 'three';

export class WarpFilter {

    #increment = 0;

    #frequency = 0;

    #radian = 0;

    #size = 0;

    #verticeList;

    #mesh;

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

    get mesh() {
        return this.#mesh;
    }

    /**
     * @param {Mesh} mesh
     */
    set mesh(mesh) {
        this.#verticeList = mesh.geometry.getAttribute('position').array.slice(0);
        this.#mesh = mesh;
    }

    resize(mesh) {
        this.mesh = mesh;
    }

}
