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

    /**
     * @param {Number} frequency
     */
    set frequency(frequency) {
        this.#frequency = window.parseFloat(frequency);
    }

    /**
     * @param {Number} degree
     */
    set degree(degree) {
        this.#radian = window.parseFloat(degree / 3) * (Math.PI / 180);
    }

    /**
     * @param {Number} amplitude
     */
    set amplitude(amplitude) {
        this.#amplitude = window.parseFloat(amplitude) / 10;
    }

    get amplitude() {
        return this.#amplitude;
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

    render() {
        this.#increment += this.#frequency;
        const position = this.#mesh.geometry.getAttribute('position').array;
        const positionLength = position.length;
        for (let index = 0; index < positionLength; index += 3) {
            const z = index + 2;
            position[z] = (this.verticeList[z]
                        + (this.getAmplitude() * window.Math.cos(
                            this.#increment + index * this.#radian,
                        )))
                        * this.getCoeficient(index);
        }
        this.#mesh.geometry.attributes.position.needsUpdate = true;
    }

    /**
     * @param {Mesh} mesh
     */
    setGeometry(mesh) {
        this.#verticeList = mesh.geometry.getAttribute('position').array.slice(0);
        this.#mesh = mesh;
    }

}
