export class Extension {

    /**
     * @constructor
     * @param {Loop} loop
     * @param {Resize} resize
     * @param {Warp} filter
     */
    constructor(loop, resize, filter) {
        this.loop = loop;
        this.resize = resize;
        this.filter = filter;
    }

    play() {
        if (!this.loop.id) {
            this.resize.register();
            this.loop.register();
        }
    }

    stop() {
        this.resize.unregister();
        this.loop.unregister();
    }

}
