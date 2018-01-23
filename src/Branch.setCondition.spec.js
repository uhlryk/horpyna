import Branch from "./Branch";

describe("Branch.setCondition", () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(async () => {
        sandbox.restore();
    });
    describe("when previous condition is not available", () => {
        let branch;
        let newConditionStub;
        beforeEach(() => {
            branch = new Branch({ name: "mainBranch" });
            newConditionStub = sandbox.stub().returns(true);
        });

        it("should add new condition", () => {
            branch.setCondition(newConditionStub);
            return branch.execute().then(() => {
                expect(newConditionStub.calledOnce).to.be.true();
            });
        });
    });

    describe("when previous condition is available", () => {
        let branch;
        let oldConditionStub;
        let newConditionStub;
        beforeEach(() => {
            oldConditionStub = sandbox.stub().returns(true);
            branch = new Branch({ name: "mainBranch", condition: oldConditionStub });
            newConditionStub = sandbox.stub().returns(true);
        });

        it("should add new condition", () => {
            branch.setCondition(newConditionStub);
            return branch.execute().then(() => {
                expect(newConditionStub.calledOnce).to.be.true();
                expect(oldConditionStub.calledOnce).to.be.false();
            });
        });
    });
});
