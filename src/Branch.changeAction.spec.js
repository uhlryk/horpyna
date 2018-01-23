import Branch from "./Branch";

describe("Branch.changeAction", () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(async () => {
        sandbox.restore();
    });
    describe("when no previous action", () => {
        let branch;
        let newActionStub;
        beforeEach(() => {
            branch = new Branch({ name: "mainBranch" });
            newActionStub = sandbox.stub().returns(true);
        });

        it("should add new action", () => {
            branch.changeAction(newActionStub);
            return branch.execute().then(() => {
                expect(newActionStub.calledOnce).to.be.true();
            });
        });
    });

    describe("when previous action", () => {
        let branch;
        let oldActionStub;
        let newActionStub;
        beforeEach(() => {
            oldActionStub = sandbox.stub().returns(true);
            branch = new Branch({ name: "mainBranch", action: oldActionStub });
            newActionStub = sandbox.stub().returns(true);
        });

        it("should add new action", () => {
            branch.changeAction(newActionStub);
            return branch.execute().then(() => {
                expect(newActionStub.calledOnce).to.be.true();
                expect(oldActionStub.calledOnce).to.be.false();
            });
        });
    });
});
