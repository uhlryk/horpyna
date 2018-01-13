import createChangeCondition from "./createChangeCondition";

describe("createChangeCondition", () => {
    let sandbox;
    let oldConditionStub;
    let newConditionStub;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        oldConditionStub = sandbox.stub();
        newConditionStub = sandbox.stub();
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
            const changeCondition = createChangeCondition(options);
            const newOptions = changeCondition(newConditionStub);
            expect(newOptions).to.be.equal(options);
        });
    });

    describe("options doesn't contain any condition", () => {
        let options;
        beforeEach(() => {
            options = {};
        });

        it("should return options with new action", () => {
            const changeCondition = createChangeCondition(options);
            const newOptions = changeCondition(newConditionStub);
            expect(newOptions).to.have.property("condition", newConditionStub);
        });
    });

    describe("options contains condition", () => {
        let options;
        beforeEach(() => {
            options = {
                condition: oldConditionStub
            };
        });

        it("should return options with new condition", () => {
            const changeCondition = createChangeCondition(options);
            const newOptions = changeCondition(newConditionStub);
            expect(newOptions).to.have.property("condition", newConditionStub);
        });
    });
});
