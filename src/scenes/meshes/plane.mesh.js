import {
    Mesh,
    PlaneGeometry,
    MeshBasicMaterial,
    TextureLoader,
    ClampToEdgeWrapping,
    LinearFilter,
    RGBFormat
} from 'three';

export class Plane extends Mesh {

    /**
     * @constructor
     * @param {number} width 
     * @param {number} height 
     * @param {Camera} camera 
     * @param {string} image 
     */
    constructor(width, height, camera, image) {
        super(
            new PlaneGeometry(
                (2 * window.Math.tan(
                    (camera.fov * window.Math.PI / 180) / 2
                )) * camera.aspect,
                2 * window.Math.tan((camera.fov * window.Math.PI / 180) / 2),
                window.Math.ceil(width / 55),
                window.Math.ceil(height / 55 / 2)
            ),
            new MeshBasicMaterial({ map: new TextureLoader().load(image) })
        );
        this.rotation.x = -Math.PI / 2;
        this.material.map.wrapS = ClampToEdgeWrapping;
        this.material.map.wrapT = ClampToEdgeWrapping;
        this.material.map.minFilter = LinearFilter;
        this.material.map.magFilter = LinearFilter;
        this.material.map.format = RGBFormat;
    }

}