import { Event } from '../../events/event';
import { MouseService } from './shared/mouse.service';
import { WarpFilter } from './warp.filter';

export class MouseWrapFilter extends WarpFilter {

    #event;

    #duration;

    #distance;

    #mouseList = [];

    /**
     * @param {Event} target
     */
    constructor(event) {
        super();
        this.#event = event;
    }

    get event() {
        return this.#event;
    }

    /**
     * @param {Number} duration
     */
    set duration(duration) {
        this.#duration = duration;
    }

    get duration() {
        return this.#duration;
    }

    /**
     * @param {Number} distance
     */
    set distance(distance) {
        this.#distance = (10 - (10 * (distance / 100))) + 1;
    }

    get distance() {
        return this.#distance;
    }

    get mouseList() {
        return this.#mouseList;
    }

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     */
    resize(mesh, camera) {
        this.setGeometry(mesh, camera);
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

}
