import html2canvas from 'html2canvas';

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
        this.vertices = [];
        this.mesh = mesh;
        for (let i = 0, l = mesh.geometry.vertices.length; i < l; i++) {
            this.vertices.push({
                x: mesh.geometry.vertices[i].x,
                y: mesh.geometry.vertices[i].y,
                z: mesh.geometry.vertices[i].z
            })
        }
    }

    /**
     * @returns {void} 
     */
    render() {
        this.frequencyIncrement += this.frequency;
        for (let i = 0, l = this.vertices.length; i < l; i++) {
            this.mesh.geometry.vertices[i].z = this.vertices[i].z + (
                this.size * window.Math.cos(
                    this.frequencyIncrement + i * this.radian
                )
            );
            this.mesh.geometry.verticesNeedUpdate = true;
        }
    }

}