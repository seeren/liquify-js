import { Mesh, Vector3, Face } from 'three';

import { Mouse } from './mouse.model';

export class MouseService {

    /**
     * @param {Face} face
     */
    static create(mesh, face, verticeList, amplitude) {
        const mouse = new Mouse();
        mouse.vector = MouseService.getVector(mesh, face);
        mouse.amplitude = amplitude;
        mouse.distanceMax = MouseService.getDistanceMax(verticeList, mouse.vector);
        return mouse;
    }

    /**
     * @param {Mesh} mesh
     * @param {Face} face
     * @returns {Vector3}
     */
    static getVector(mesh, face) {
        return new Vector3(
            mesh.geometry.getAttribute('position').getX(face.a),
            mesh.geometry.getAttribute('position').getY(face.a),
            mesh.geometry.getAttribute('position').getZ(face.a),
        );
    }

    /**
     * @param {Float32Array} verticeList
     * @param {Vector3} vector
     * @returns {Number}
     */
    static getDistanceMax(verticeList, vector) {
        let distanceMax = 0;
        const verticeListLength = verticeList.length;
        for (let index = 0; index < verticeListLength; index += 3) {
            const distance = vector.distanceTo(new Vector3(
                verticeList[index],
                verticeList[index + 1],
                verticeList[index + 2],
            ));
            if (distance > distanceMax) {
                distanceMax = distance;
            }
        }
        return distanceMax;
    }

    /**
     * @param {Float32Array} verticeList
     * @param {Mouse} mouse
     * @param {Number} distanceCoef
     * @param {Number} index
     * @returns {Number}
     */
    static getCoeficient(verticeList, mouse, distanceCoef, index) {
        const distance = mouse.vector.distanceTo(new Vector3(
            verticeList[index],
            verticeList[index + 1],
            verticeList[index + 2],
        ));
        const coeficient = 1 - ((distance * distanceCoef) / mouse.distanceMax);
        return 0 > coeficient ? 0 : coeficient;
    }

}
