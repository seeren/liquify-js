export class Element {

    /**
     * @param {HTMLElement} node 
     * @returns {HTMLElement}
     */
    static create(node) {
        let element = window.document.createElement('liquify');
        if (node.id) {
            element.id = node.id;
        }
        if (node.className) {
            element.className = node.className;
        }
        if (node.style) {
            element.style = node.style;
        }
        element.style.display = `none`;
        return node.parentNode.insertBefore(element, node);
    }

}