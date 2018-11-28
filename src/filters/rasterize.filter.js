import html2canvas from 'html2canvas';

export class Rasterize {

    /**
     * @param {HTMLElement} node 
     * @param {HTMLElement} container 
     * @param {Function} success 
     */
    render(node, container, success) {
        container.style.display = `none`;
        node.style.display = ``;
        html2canvas(node, {
            logging: false,
            backgroundColor: null
        }).then((canvas) => {
            success(canvas);
            container.style.width = `${node.offsetWidth}px`;
            container.style.height = `${node.offsetHeight}px`;
            node.style.display = `none`;
            container.style.display = `block`;
        });
    }

}