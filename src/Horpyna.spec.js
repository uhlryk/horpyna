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
                const nodeFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.do(nodeFunctionStub)
                    .when(() => true)
                    .setValue(valueStub);
                expect(result).to.be.equal(responseStub);
                expect(nodeFunctionStub.calledOnce).to.be.true();
                expect(nodeFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
            });
        });
    });

    describe("when conditions not met", () => {
        describe("when no child nodes", () => {
            it("should return undefined", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const nodeFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.do(nodeFunctionStub)
                    .when(() => false)
                    .setValue(valueStub);
                expect(result).to.be.undefined();
                expect(nodeFunctionStub.called).to.be.false();
            });
        });
    });

    describe("when node doesn't have conditions", () => {
        describe("when no child nodes", () => {
            it("should return response from node function", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const nodeFunctionStub = sandbox.stub().returns(responseStub);
                const result = Horpyna.do(nodeFunctionStub).setValue(valueStub);
                expect(result).to.be.equal(responseStub);
                expect(nodeFunctionStub.calledOnce).to.be.true();
                expect(nodeFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
            });
        });

        describe("when one child node without conditions", () => {
            it("should return response from child node function", () => {
                const responseStub = sandbox.stub();
                const childResponseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const nodeFunctionStub = sandbox.stub().returns(responseStub);
                const childNodeFunctionStub = sandbox.stub().returns(childResponseStub);
                const result = Horpyna.do(nodeFunctionStub)
                    .addBranch(Horpyna.do(childNodeFunctionStub))
                    .setValue(valueStub);
                expect(result).to.be.equal(childResponseStub);
                expect(nodeFunctionStub.calledOnce).to.be.true();
                expect(nodeFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
                expect(childNodeFunctionStub.calledOnce).to.be.true();
                expect(childNodeFunctionStub.getCall(0).args[0]).to.be.eql(responseStub);
            });
        });
    });
});
