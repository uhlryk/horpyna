/* eslint-disable no-unused-vars */
import createChangeAction from "./createChangeAction";

describe("createChangeAction", () => {
    let sandbox;
    let debugStub;
    let oldActionStub;
    let newActionStub;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        debugStub = sandbox.stub();
        oldActionStub = sandbox.stub();
        newActionStub = sandbox.stub();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    describe("options doesn't contain any action", () => {
        let options;
        beforeEach(() => {
            options = {};
        });

        it("should return options with new action", () => {
            const method = createChangeAction(options, debugStub);
            const newOptions = method(newActionStub);
            expect(newOptions).to.have.property("action", newActionStub);
        });
    });

    describe("options contains action", () => {
        let options;
        beforeEach(() => {
            options = {
                action: oldActionStub
            };
        });

        it("should return options with new action", () => {
            const method = createChangeAction(options, debugStub);
            const newOptions = method(newActionStub);
            expect(newOptions).to.have.property("action", newActionStub);
        });
    });
});
