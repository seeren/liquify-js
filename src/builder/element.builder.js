import { ClickWarpFilter } from '../filters/click.warp.filter';
import { DefaultWarpFilter } from '../filters/default.warp.filter';

export class ElementBuilder {

    /**
     * @param {HTMLElement} element
     */
    build(element) {
        switch (element.getAttribute('data-liquify')) {
        case 'click':
            element.Liquify = new ClickWarpFilter();
            break;
        default:
            element.Liquify = new DefaultWarpFilter();
            break;
        }
        element.Liquify.frequency = element.getAttribute('data-frequency') || 3;
        element.Liquify.degree = element.getAttribute('data-degree') || 130;
        element.Liquify.amplitude = element.getAttribute('data-amplitude') || 5;
    }

}
