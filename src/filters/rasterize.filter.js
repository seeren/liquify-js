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
        liquify.style.display = 'none';
        target.style.opacity = 1;
        const { position, display } = window.getComputedStyle(target);
        const canvas = await html2canvas(target, { logging: false, backgroundColor: null });
        liquify.style.width = `${target.offsetWidth}px`;
        liquify.style.height = `${target.offsetHeight}px`;
        liquify.style.display = display;
        liquify.style.position = position;
        if ('static' === position) {
            liquify.style.marginTop = `-${target.offsetHeight}px`;
        }
        liquify.style.backgroundImage = `url(${canvas.toDataURL()})`;
        liquify.style.backgroundSize = '100% 100%';
        target.style.opacity = 0;
        return canvas;
    }

}
