import Branch from "./Branch";

describe("Branch.getCondition", () => {
    let branch;
    let conditionStub;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        conditionStub = sandbox.stub().returns(true);
        branch = new Branch({ name: "mainBranch", condition: conditionStub });
    });

    afterEach(async () => {
        sandbox.restore();
    });

    it("should get condition", () => {
        expect(branch.getCondition()).to.be.equal(conditionStub);
    });
});
