import { WarpFilter } from '../filters/warp.filter';

export class ElementBuilder {

    /**
     * @param {HTMLElement} element
     */
    build(element) {
        element.Liquify = new WarpFilter();
        element.Liquify.frequency = element.getAttribute('data-frequency') || 3;
        element.Liquify.degree = element.getAttribute('data-degree') || 130;
        element.Liquify.amplitude = element.getAttribute('data-amplitude') || 5;
    }

}
