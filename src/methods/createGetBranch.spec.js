import Horpyna from "../Horpyna";
import createGetBranch from "./createGetBranch";

describe("createGetBranch", () => {
    let sandbox;
    let testBranch;
    let options;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        testBranch = Horpyna({ name: "testBranchName" });
        options = {
            branches: [testBranch]
        };
    });

    afterEach(async () => {
        sandbox.restore();
    });

    it("should return branch by name", () => {
        const getBranch = createGetBranch(options);
        const branch = getBranch("testBranchName");
        expect(branch).to.be.equal(testBranch);
    });

    it("should return undefined", () => {
        const getBranch = createGetBranch(options);
        const undefinedResponse = getBranch("wrongName");
        expect(undefinedResponse).to.be.null();
    });
});
