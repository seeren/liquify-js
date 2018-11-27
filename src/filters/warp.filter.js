import html2canvas from 'html2canvas';

export class WarpFilter {

    /**
     * @constructor
     */
    constructor() {
        this.frequency = 0.5;
        this.radian = 1.5;
        this.amplitude = 0.004;
        this.frequencyIncrement = 0;
        this.vertices = [];
    }

    /**
     * @param {Mesh} mesh 
     */
    setMesh(mesh) {
        this.vertices = [];
        for (let i = 0, l = mesh.geometry.vertices.length; i < l; i++) {
            this.vertices.push({
                x: mesh.geometry.vertices[i].x,
                y: mesh.geometry.vertices[i].y,
                z: mesh.geometry.vertices[i].z
            })
        };
        this.mesh = mesh;
    }

    /**
     * @returns {void} 
     */
    render() {
        this.frequencyIncrement += this.frequency;
        for (let i = 0, l = this.vertices.length; i < l; i++) {
            this.mesh.geometry.vertices[i].z = this.vertices[i].z + (
                this.amplitude * window.Math.cos(
                    this.frequencyIncrement + i * this.radian
                )
            );
            this.mesh.geometry.verticesNeedUpdate = true;
        }
    }

}