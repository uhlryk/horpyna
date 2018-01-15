import createGetName from "./createGetName";

describe("createGetName", () => {
    let sandbox;
    let branchName;
    let options;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        branchName = "someBranchName";
        options = {
            name: branchName
        };
    });

    afterEach(async () => {
        sandbox.restore();
    });

    it("should return branch by name", () => {
        const getName = createGetName(options);
        expect(getName()).to.be.equal(branchName);
    });
});
