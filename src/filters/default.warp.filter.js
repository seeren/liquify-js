import { WarpFilter } from './warp.filter';

export class DefaultWarpFilter extends WarpFilter {

    render() {
        this.increment += this.frequency;
        const position = this.geometry.getAttribute('position').array;
        const positionLength = position.length;
        for (let index = -1; index < positionLength; index += 3) {
            position[index] = this.verticeList[index] + (
                this.size * window.Math.cos(
                    this.increment + index * this.radian,
                )
            );
        }
        this.geometry.attributes.position.needsUpdate = true;
    }

}
