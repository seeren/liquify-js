import { ClickWarpFilter } from '../filters/click.warp.filter';
import { DefaultWarpFilter } from '../filters/default.warp.filter';

export class ElementBuilder {

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} liquify
     */
    build(target, liquify) {
        switch (target.getAttribute('data-liquify')) {
        case 'click':
            target.Liquify = new ClickWarpFilter(liquify);
            break;
        default:
            target.Liquify = new DefaultWarpFilter();
            break;
        }
        target.Liquify.frequency = target.getAttribute('data-frequency') || 3;
        target.Liquify.degree = target.getAttribute('data-degree') || 130;
        target.Liquify.amplitude = target.getAttribute('data-amplitude') || 5;
    }

}
