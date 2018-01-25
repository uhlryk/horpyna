import Branch from "./Branch";

describe("Branch.clone", () => {
    let branch;

    let actionStub;
    let conditionStub;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        actionStub = sandbox.stub().returns(true);
        conditionStub = sandbox.stub().returns(true);
        branch = new Branch({ name: "mainBranch", action: actionStub, condition: conditionStub });
    });

    it("should get action", () => {
        const clonedBranch = branch.clone();
        expect(clonedBranch).to.be.not.equal(branch);
        expect(clonedBranch.getAction()).to.be.equal(actionStub);
        expect(clonedBranch.getCondition()).to.be.equal(conditionStub);
        expect(clonedBranch.getName()).to.be.equal("mainBranch");
    });
});
