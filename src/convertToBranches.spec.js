import convertToBranches from "./convertToBranches";
import Horpyna from "./Horpyna";

describe("convertToBranches", () => {
    it("should return branches from objects", () => {
        const branches = convertToBranches([
            {
                name: "testBranc"
            }
        ]);
        expect(branches[0]).to.be.instanceof(Function);
    });
    it("should return branches from branches", () => {
        const branches = convertToBranches([
            Horpyna({
                name: "testBranc"
            })
        ]);
        expect(branches[0]).to.be.instanceof(Function);
    });
});
