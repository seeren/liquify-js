import {
    Mesh,
    PlaneGeometry,
    MeshBasicMaterial,
    TextureLoader,
    ClampToEdgeWrapping,
    LinearFilter,
    RGBFormat
} from 'three';

// import { TextureLoader as THREETextureLoader} from 'three';
// import { ClampToEdgeWrapping as THREEClampToEdgeWrapping} from 'three';
// import { LinearFilter as THREELinearFilter} from 'three';
// import { RGBFormat as THREERGBFormat} from 'three';

export class Plane extends Mesh {

    /**
     * @constructor
     * @param {HTMLElement} element 
     * @param {Camera} camera 
     */
    constructor(element, camera) {
        super(
            new PlaneGeometry(
                (2 * window.Math.tan((camera.fov * window.Math.PI / 180) / 2)) * camera.aspect,
                2 * window.Math.tan((camera.fov * window.Math.PI / 180) / 2),
                window.Math.ceil(element.offsetWidth / 55),
                window.Math.ceil(element.offsetHeight / 55 / 2)
            ),
            new MeshBasicMaterial
        );
        this.rotation.x = -Math.PI / 2;
    }
    /**
     * @param {string} src 
     */
    setTexture(src) {
        this.material.map = new TextureLoader().load(src);
        this.material.map.wrapS = ClampToEdgeWrapping;
        this.material.map.wrapT = ClampToEdgeWrapping;
        this.material.map.minFilter = LinearFilter;
        this.material.map.magFilter = LinearFilter;
        this.material.map.format = RGBFormat;
        this.material.needsUpdate = true;
    }
}