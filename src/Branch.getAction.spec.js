import Branch from "./Branch";

describe("Branch.getAction", () => {
    let branch;
    let actionStub;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        actionStub = sandbox.stub().returns(true);
        branch = new Branch({ name: "mainBranch", action: actionStub });
    });

    afterEach(async () => {
        sandbox.restore();
    });

    it("should get action", () => {
        expect(branch.getAction()).to.be.equal(actionStub);
    });
});
