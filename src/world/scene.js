import { Scene as THREEScene} from 'three';

export class Scene extends THREEScene {

    /**
     * @constructor
     */
    constructor(subject) {
        super();
        this.setSubject(subject);
    }

    /**
     * @returns {Mesh}
     */
    getSubject() {
        return this.subject;
    }

    /**
     * @param {Mesh} mesh
     */
    setSubject(subject) {
        if (this.subject) {
            this.remove(this.subject);
        }
        this.add(subject);
        this.subject = subject;
    }

}
