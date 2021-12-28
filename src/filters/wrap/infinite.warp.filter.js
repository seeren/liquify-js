import { EventManager } from '../../events/event.manager';
import { WarpFilter } from './warp.filter';

export class InfinitetWarpFilter extends WarpFilter {

    /**
     * @param {Mesh} mesh
     */
    setGeometry(mesh) {
        super.setGeometry(mesh);
        EventManager.get('animation').attach((this.handler));
    }

    render() {
        this.increment += this.frequency;
        const position = this.mesh.geometry.getAttribute('position').array;
        const positionLength = position.length;
        for (let index = 0; index < positionLength; index += 3) {
            const z = index + 2;
            position[z] = (this.verticeList[z]
                        + (this.amplitude * window.Math.cos(
                            this.increment + index * this.radian,
                        )));
        }
        this.mesh.geometry.attributes.position.needsUpdate = true;
    }

}
