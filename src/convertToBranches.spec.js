import convertToBranches from "./convertToBranches";
import Branch from "./Branch";

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
            Branch({
                name: "testBranc"
            })
        ]);
        expect(branches[0]).to.be.instanceof(Function);
    });
});
