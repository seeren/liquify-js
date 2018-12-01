import {
    Mesh,
    PlaneGeometry,
    MeshBasicMaterial,
    TextureLoader,
    ClampToEdgeWrapping,
    LinearFilter,
    RGBFormat
} from "three";

export class Plane extends Mesh {

    /**
     * @constructor
     * @param {Camera} camera 
     * @param {HTMLElement} element 
     * @param {string} src 
     */
    constructor(camera, element, src) {
        super(
            new PlaneGeometry(
                (2 * window.Math.tan((camera.fov * window.Math.PI / 180) / 2)) * camera.aspect,
                2 * window.Math.tan((camera.fov * window.Math.PI / 180) / 2),
                window.Math.ceil(element.offsetWidth / 55),
                window.Math.ceil(element.offsetHeight / 55 / 2)
            ),
            new MeshBasicMaterial({ map: new TextureLoader().load(src) })
        );
        this.rotation.x = -Math.PI / 2;
        this.material.map.wrapS = ClampToEdgeWrapping;
        this.material.map.wrapT = ClampToEdgeWrapping;
        this.material.map.minFilter = LinearFilter;
        this.material.map.magFilter = LinearFilter;
        this.material.map.format = RGBFormat;
    }

}