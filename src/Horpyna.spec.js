/* eslint-disable no-unused-vars */
import Horpyna from "./Horpyna";

describe("Hopyna", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    describe("when conditions not met", () => {
        describe("when no child branches", () => {
            it("should return undefined", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.when(() => false)
                    .do(branchFunctionStub)
                    .setValue(valueStub);
                expect(result).to.be.undefined();
                expect(branchFunctionStub.called).to.be.false();
            });
        });
    });

    describe("when main branch conditions met", () => {
        describe("when no child branches", () => {
            it("should return response from main branch 'do' function", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.when(() => true)
                    .do(branchFunctionStub)
                    .setValue(valueStub);
                expect(result).to.be.equal(responseStub);
                expect(branchFunctionStub.calledOnce).to.be.true();
                expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
            });
        });

        describe("when one child branch without conditions", () => {
            it("should return response from child branch 'do' function", () => {
                const responseStub = sandbox.stub();
                const childResponseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const childBranchFunctionStub = sandbox.stub().returns(childResponseStub);
                const result = Horpyna.when(() => true)
                    .do(branchFunctionStub)
                    .addBranch("subBranchName", Horpyna.when(() => true).do(childBranchFunctionStub))
                    .setValue(valueStub);
                expect(result).to.be.equal(childResponseStub);
                expect(branchFunctionStub.calledOnce).to.be.true();
                expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
                expect(childBranchFunctionStub.calledOnce).to.be.true();
                expect(childBranchFunctionStub.getCall(0).args[0]).to.be.eql(responseStub);
            });
        });
    });
});
