import html2canvas from 'html2canvas';

export class Rasterize {

    /**
     * @param {HTMLElement} node 
     * @param {Scene} scene 
     * @param {Renderer} renderer 
     */
    constructor(node, scene, renderer) {
        this.render(node, scene, renderer);
    }

    /**
     * @param {HTMLElement} node 
     * @param {Scene} scene 
     * @param {Renderer} renderer 
     */
    render(node, scene, renderer) {
        this.render = () => {
            console.log("?");
            
        //     node.style.display = '';
        //     world.renderer.domElement.parentNode.style.display = 'none';
        //     let width = node.offsetWidth;
        //     let height = node.offsetHeight;
        //     world.renderer.domElement.parentNode.style.width = `${width}px`;
        //     world.renderer.domElement.parentNode.style.height = `${height}px`;
        //     world.camera.aspect = width / height;
        //     world.renderer.setSize(width, height);
        //     world.camera.updateProjectionMatrix();
        //     node.style.display = 'none';
        //     world.renderer.domElement.parentNode.style.display = 'block';
        //     world.scene.setSubject(world.scene.getSubject().getCopy());
        //     node.style.display = '';
        //     world.renderer.domElement.parentNode.style.display = 'none';
        //     html2canvas(node, { backgroundColor: null }).then((canvas) => {
        //         node.style.display = 'none';
        //         world.renderer.domElement.parentNode.style.display = 'block';
        //         world.scene.getSubject().setTexture(canvas.toDataURL());
        //     });
        }
    }

}