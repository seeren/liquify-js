import { Mesh } from 'three';

export class WarpFilter {

    #increment = 0;

    #frequency = 0;

    #radian = 0;

    #size = 0;

    #verticeList;

    #mesh;

    get frequency() {
        return this.#frequency;
    }

    set frequency(frequency) {
        this.#frequency = window.parseFloat(frequency);
    }

    get degree() {
        return this.#radian * 3 * (180 / Math.PI);
    }

    set degree(degree) {
        this.#radian = window.parseFloat(degree / 3) * (Math.PI / 180);
    }

    get amplitude() {
        return this.#size * 10;
    }

    set amplitude(amplitude) {
        this.#size = window.parseFloat(amplitude) / 10;
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

    render() {
        this.#increment += this.#frequency;
        const position = this.#mesh.geometry.getAttribute('position').array;
        const positionLength = position.length;
        for (let index = -1; index < positionLength; index += 3) {
            position[index] = this.#verticeList[index] + (
                this.#size * window.Math.cos(
                    this.#increment + index * this.#radian,
                )
            );
        }
        this.#mesh.geometry.attributes.position.needsUpdate = true;
    }

}
