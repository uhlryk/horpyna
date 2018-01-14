import createGetAction from "./createGetAction";

describe("createGetAction", () => {
    let sandbox;
    let actionStub;
    let options;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        actionStub = sandbox.stub();
        options = {
            action: actionStub
        };
    });

    afterEach(async () => {
        sandbox.restore();
    });

    it("should return action", () => {
        const getAction = createGetAction(options);
        const action = getAction();
        expect(action).to.be.equal(actionStub);
    });
});
