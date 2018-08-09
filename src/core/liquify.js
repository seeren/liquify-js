import html2canvas from 'html2canvas';
import { Loop } from '../events/loop';
import { World } from '../world/world';
import { Resize } from '../events/resize';
import { Rasterize } from '../filters/rasterize';
import { Warp } from '../filters/warp';
import { Extension } from './extension';

export class Liquify {

    /**
     * @constructor
     */
    constructor() {
        let nodeList = window.document.querySelectorAll('[liquify]');
        for (let i = 0, l = nodeList.length; i < l; i++) {
            this.upgrade(nodeList[i]);
        }
    }

    /**
     * @param {HTMLElement} node 
     */
    upgrade(node) {
        let loop = new Loop;
        let resize = new Resize;
        let warpFilter = new Warp;
        node.Liquify = new Extension(loop, resize, warpFilter);
        html2canvas(node, { backgroundColor: null }).then((canvas) => {
            let world = new World(node);
            let rasterizeFilter = new Rasterize(node, world);
            warpFilter.setMesh(world.scene.getSubject());
            world.scene.getSubject().setTexture(canvas.toDataURL());
            resize.bind(() => rasterizeFilter.render());
            resize.bind(() => warpFilter.setMesh(world.scene.getSubject()));
            resize.register();
            loop.bind(() => warpFilter.render());
            loop.bind(() => world.renderer.render(world.scene, world.camera));
            loop.register();
        });
    }

}