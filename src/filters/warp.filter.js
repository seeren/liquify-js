export class WarpFilter {

    /**
     * @constructor
     */
    constructor() {
        this.frequency;
        this.radian;
        this.size;
        this.vertices = [];
        this.frequencyIncrement = 0;
    }

    /**
     * @param {float} degree
     */
    set degree(degree) {
        this.radian = degree * (Math.PI / 180);
    }

    /**
     * @param {float} amplitude
     */
    set amplitude(amplitude) {
        this.size = amplitude / 100;
    }

    /**
     * @param {Mesh} mesh 
     */
    resize(mesh) {
        this.mesh = mesh;
        this.vertices = [];
        mesh.geometry.vertices.forEach(vertice => {
            this.vertices.push({
                x: vertice.x,
                y: vertice.y,
                z: vertice.z
            })
        });
    }

    /**
     * @returns {void} 
     */
    render() {
        this.frequencyIncrement += this.frequency;
        this.vertices.forEach((vertice, index) => {
            this.mesh.geometry.vertices[index].z = vertice.z + (
                this.size * window.Math.cos(
                    this.frequencyIncrement + index * this.radian
                )
            );
            this.mesh.geometry.verticesNeedUpdate = true;
        });
    }

}