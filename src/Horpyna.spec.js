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
    it("should call action function when no conditions", () => {
        const responseStub = sandbox.stub();
        const valueStub = sandbox.stub();
        const actionFunctionStub = sandbox.stub().returns(responseStub);
        Horpyna.createNode(actionFunctionStub)
            .setValues(valueStub);
        expect(actionFunctionStub.calledOnce).to.be.true();
        expect(actionFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
    });

    it("should call action function when conditions met", () => {
        const responseStub = sandbox.stub();
        const valueStub = sandbox.stub();
        const actionFunctionStub = sandbox.stub().returns(responseStub);
        Horpyna.createNode(actionFunctionStub)
            .setCondition(() => true)
            .setValues(valueStub);
        expect(actionFunctionStub.calledOnce).to.be.true();
        expect(actionFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
    });

    it("should not call action function when conditions not met", () => {
        const responseStub = sandbox.stub();
        const valueStub = sandbox.stub();
        const actionFunctionStub = sandbox.stub().returns(responseStub);
        Horpyna.createNode(actionFunctionStub)
            .setCondition(() => false)
            .setValues(valueStub);
        expect(actionFunctionStub.called).to.be.false();
    });
});
