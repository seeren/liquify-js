import { ClickWarpFilter } from '../filters/wrap/click.warp.filter';
import { InfinitetWarpFilter } from '../filters/wrap/infinite.warp.filter';
import { MoveWarpFilter } from '../filters/wrap/move.warp.filter';

export class ElementBuilder {

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} liquify
     */
    build(target, liquify) {
        switch (target.getAttribute('data-liquify')) {
        case 'click':
            target.Liquify = new ClickWarpFilter(liquify);
            this.#buildGesture(target);
            break;
        case 'move':
            target.Liquify = new MoveWarpFilter(liquify);
            this.#buildGesture(target);
            break;
        default:
            target.Liquify = new InfinitetWarpFilter();
        }
        target.Liquify.frequency = window.parseFloat(target.getAttribute('data-frequency') || 0.25);
        target.Liquify.degree = window.parseFloat(target.getAttribute('data-degree') || 19);
        target.Liquify.amplitude = window.parseFloat(target.getAttribute('data-amplitude') || 0.5);
    }

    /**
     * @param {HTMLElement} target
     */
    #buildGesture(target) {
        target.Liquify.duration = window.parseFloat(target.getAttribute('data-duration') || 5);
        target.Liquify.distance = window.parseFloat(target.getAttribute('data-distance') || 75);
    }

}
