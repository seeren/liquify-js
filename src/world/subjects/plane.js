import { Mesh as THREEMesh} from 'three';
import { PlaneGeometry as THREEPlaneGeometry} from 'three';
import { MeshBasicMaterial as THREEMeshBasicMaterial} from 'three';
import { TextureLoader as THREETextureLoader} from 'three';
import { ClampToEdgeWrapping as THREEClampToEdgeWrapping} from 'three';
import { LinearFilter as THREELinearFilter} from 'three';
import { RGBFormat as THREERGBFormat} from 'three';
import { LineSegments as THREELineSegments} from 'three';
import { WireframeGeometry as THREEWireframeGeometry} from 'three';
import { LineBasicMaterial as THREELineBasicMaterial} from 'three';

export class Plane extends THREEMesh {

    /**
     * @constructor
     * @param {HTMLElement} container 
     * @param {Camera} camera 
     */
    constructor(container, camera) {
        super(
            new THREEPlaneGeometry(
                (2 * Math.tan((camera.fov * Math.PI / 180) / 2)) * camera.aspect,
                2 * Math.tan((camera.fov * Math.PI / 180) / 2),
                Math.ceil(container.offsetWidth / 55),
                Math.ceil(container.offsetHeight / 55 / 2)
            ),
            new THREEMeshBasicMaterial
        );
        this.rotation.x = -Math.PI / 2;
        this.getCopy(container, camera);
    }

    /**
     * @param {HTMLElement} container 
     * @param {Camera} camera 
     */
    getCopy(container, camera) {
        this.getCopy = () => {
            return new Plane(container, camera);
        };
    }

    /**
     * @param {string} src 
     */
    setTexture(src) {
        this.material.map = new THREETextureLoader().load(src);
        this.material.map.wrapS = THREEClampToEdgeWrapping;
        this.material.map.wrapT = THREEClampToEdgeWrapping;
        this.material.map.minFilter = THREELinearFilter;
        this.material.map.magFilter = THREELinearFilter;
        this.material.map.format = THREERGBFormat;
        this.material.needsUpdate = true;
    }

    addWireframe() {
        this.add(
            new THREELineSegments(
                new THREEWireframeGeometry(this.geometry),
                new THREELineBasicMaterial({ color: 0xff00ff, linewidth: 2 })
            )
        );
    }
}
