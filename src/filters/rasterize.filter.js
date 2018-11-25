import html2canvas from 'html2canvas';

export class Rasterize {

    /**
     * @param {HTMLElement} node 
     * @param {Camera} camera 
     * @param {Scene} scene 
     * @param {Renderer} renderer 
     */
    render(node, camera, scene, renderer) {
        renderer.domElement.parentNode.style.display = `none`;
        node.style.display = ``;
        html2canvas(node, {
            logging: false,
            backgroundColor: null
        }).then((canvas) => {
            const width = node.offsetWidth;
            const height = node.offsetHeight;
            camera.resize(width, height);
            renderer.resize(width, height);
            scene.resize(width, height, camera, canvas.toDataURL());
            renderer.domElement.parentNode.style.width = `${node.offsetWidth}px`;
            renderer.domElement.parentNode.style.height = `${node.offsetHeight}px`;
            node.style.display = `none`;
            renderer.domElement.parentNode.style.display = `block`;
        });
    }

}