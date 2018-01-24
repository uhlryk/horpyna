import Branch from "./Branch";

describe("Branch.setName", () => {
    let sandbox;
    let branch;
    beforeEach(() => {
        branch = new Branch({ name: "mainBranch" });
        sandbox = sinon.sandbox.create();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    it("should change name", () => {
        expect(branch.getName()).to.be.equal("mainBranch");
        branch.setName("newBranchName");
        expect(branch.getName()).to.be.equal("newBranchName");
    });
});
