/* eslint-disable no-unused-vars */
import Horpyna from "./Horpyna";

describe("Hopyna", () => {

    it("should init node without errors", () => {
        expect(() => {
            let horpyna = Horpyna.createNode();
        }).to.not.throw();
    });
});
