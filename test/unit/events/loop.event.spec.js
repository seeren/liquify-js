import { describe, beforeEach, it } from "mocha";
import { assert } from "chai";
import { window } from "../../window";
import { Loop } from "../../../src/events/loop.event";

describe("Loop", () => {

    let event;

    beforeEach(() => event = new Loop);

    describe("set fps(fps)", () => {
        it("Calcul ms", () => {
            event.fps = 20;
            assert.equal(event.ms, 50);
        });
    });

    describe("register", () => {
        it("Provide id", () => {
            event.register();
            assert.isNumber(event.id);
            event.unregister();
        });
    });

    describe("unregister", () => {
        it("Clear id", () => {
            event.register();
            event.unregister();
            assert.isNotNumber(event.id);
        });
    });

    describe("emit", () => {
        it("Call attched functions", (done) => {
            let state = false;
            event.attach(() => state = true);
            event.emit();
            assert.isFalse(state);
            window.setTimeout(() => {
                event.unregister();
                assert.isTrue(state);
                done();
            }, 100);
        });
    });

});