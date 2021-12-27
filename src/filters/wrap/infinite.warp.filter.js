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

    getCoeficient() {
        return 1;
    }

    getAmplitude() {
        return this.amplitude;
    }

}
