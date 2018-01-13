import createChangeAction from "./createChangeAction";

describe("createChangeAction", () => {
    let sandbox;
    let oldActionStub;
    let newActionStub;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        oldActionStub = sandbox.stub();
        newActionStub = sandbox.stub();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    describe("method is mutable", () => {
        let options;
        beforeEach(() => {
            options = {};
        });

        it("should return same options object", () => {
            const changeAction = createChangeAction(options);
            const newOptions = changeAction(newActionStub);
            expect(newOptions).to.be.equal(options);
        });
    });

    describe("options doesn't contain any action", () => {
        let options;
        beforeEach(() => {
            options = {};
        });

        it("should return options with new action", () => {
            const changeAction = createChangeAction(options);
            const newOptions = changeAction(newActionStub);
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
            const changeAction = createChangeAction(options);
            const newOptions = changeAction(newActionStub);
            expect(newOptions).to.have.property("action", newActionStub);
        });
    });
});
