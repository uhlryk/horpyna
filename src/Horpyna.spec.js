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
    describe("when node conditions met", () => {
        describe("when no child nodes", () => {
            it("should return response from node function", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.do(branchFunctionStub)
                    .when(() => true)
                    .setValue(valueStub);
                expect(result).to.be.equal(responseStub);
                expect(branchFunctionStub.calledOnce).to.be.true();
                expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
            });
        });
    });

    describe("when conditions not met", () => {
        describe("when no child nodes", () => {
            it("should return undefined", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.do(branchFunctionStub)
                    .when(() => false)
                    .setValue(valueStub);
                expect(result).to.be.undefined();
                expect(branchFunctionStub.called).to.be.false();
            });
        });
    });

    describe("when node doesn't have conditions", () => {
        describe("when no child nodes", () => {
            it("should return response from node function", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.do(branchFunctionStub).setValue(valueStub);
                expect(result).to.be.equal(responseStub);
                expect(branchFunctionStub.calledOnce).to.be.true();
                expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
            });
        });

        describe("when one child node without conditions", () => {
            it("should return response from child node function", () => {
                const responseStub = sandbox.stub();
                const childResponseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const childBranchFunctionStub = sandbox.stub().returns(childResponseStub);
                const result = Horpyna.do(branchFunctionStub)
                    .addBranch(Horpyna.do(childBranchFunctionStub))
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
