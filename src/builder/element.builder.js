import { TouchWarpFilter } from '../filters/touch.warp.filter';
import { InfinitetWarpFilter } from '../filters/infinite.warp.filter';

export class ElementBuilder {

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} liquify
     */
    build(target, liquify) {
        switch (target.getAttribute('data-liquify')) {
        case 'touch':
            target.Liquify = new TouchWarpFilter(liquify);
            target.Liquify.duration = window.parseFloat(target.getAttribute('data-duration') || 5);
            break;
        default:
            target.Liquify = new InfinitetWarpFilter();
            break;
        }
        target.Liquify.frequency = window.parseFloat(target.getAttribute('data-frequency') || 0.25);
        target.Liquify.degree = window.parseFloat(target.getAttribute('data-degree') || 130);
        target.Liquify.amplitude = window.parseFloat(target.getAttribute('data-amplitude') || 0.25);
    }

}
