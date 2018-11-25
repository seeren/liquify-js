export class Api {

    /**
     * @param {Loop} loop 
     * @param {Resize} resize 
     * @param {Filter} filter 
     * @returns {Object}
     */
    static create(loop, resize, filter) {
        return {
            get filter() {
                return filter;
            },
            play() {
                if (!this.loop.id) {
                    this.resize.register();
                    this.loop.register();
                    return true;
                }
                return false;
            },
            stop() {
                if (this.loop.id) {
                    this.resize.unregister();
                    this.loop.unregister();
                    return true;
                }
                return false;
            }

        }
    }

}