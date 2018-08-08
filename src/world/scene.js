export class Scene extends THREE.Scene {

    /**
     * @constructor
     * @param {Camera} camera 
     */
    constructor(camera) {
        super();
        this.addPlane(camera);
    }

    /**
     * @param {Camera} camera 
     */
    addPlane(camera) {
        this.addPlane = (color) => {
            let height = 2 * Math.tan((camera.fov * Math.PI / 180) / 2);
            this.plane = new THREE.Mesh(
                new THREE.PlaneGeometry(
                    height * camera.aspect,
                    height,
                    16,
                    8
                ),
                new THREE.MeshBasicMaterial({ color: color || 0xffffff })
            );
            this.plane.rotation.x = -Math.PI / 2;
            this.add(this.plane);
        };
    }

    /**
     * @param {string} src 
     */
    setPlaneTexture(src) {
        this.plane.material.map = new THREE.TextureLoader().load(src);
        this.plane.material.map.wrapS = THREE.ClampToEdgeWrapping;
        this.plane.material.map.wrapT = THREE.ClampToEdgeWrapping;
        this.plane.material.map.minFilter = THREE.LinearFilter;
        this.plane.material.map.magFilter = THREE.LinearFilter;
        this.plane.material.map.format = THREE.RGBFormat;
        this.plane.material.needsUpdate = true;
    }

}
