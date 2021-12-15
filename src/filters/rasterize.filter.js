import html2canvas from 'html2canvas';

import { Filter } from './filter';

export class RasterizeFilter extends Filter {

    async resize(target, liquify) {
        super.resize();
        const canvas = await this.render(target, liquify);
        return canvas;
    }

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} liquify
     */
    async render(target, liquify) {
        super.render();
        target.style.display = '';
        liquify.style.display = 'none';
        const canvas = await html2canvas(target, { logging: false, backgroundColor: null });
        const styles = window.getComputedStyle(target);
        if ('' !== styles.cssText) {
            liquify.style.cssText = styles.cssText;
        } else {
            const cssText = Array.from(styles).reduce(
                (css, propertyName) => `${css}${propertyName}:${styles.getPropertyValue(propertyName)};`,
            );
            liquify.style.cssText = cssText;
        }
        target.style.display = 'none';
        liquify.style.display = '';
        return canvas;
    }

}
