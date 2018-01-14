import createSetValue from "./createSetValue";
import Horpyna from "../Horpyna";
import Promise from "bluebird";

describe("createSetValue", () => {
    let sandbox;
    let value;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        value = sandbox.stub();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    describe("options argument is not provided", () => {
        it("should return input value", () => {
            const setValue = createSetValue();
            return setValue(value).then(response => {
                expect(response).to.be.equal(value);
            });
        });
    });

    describe("condition is not met", () => {
        let options;
        beforeEach(() => {
            options = {
                condition: () => false
            };
        });

        it("should return null", () => {
            const setValue = createSetValue(options);
            return setValue(value).then(response => {
                expect(response).to.be.null();
            });
        });
    });

    describe("condition is met", () => {
        let options;
        beforeEach(() => {
            options = {
                condition: () => true,
                action: value => value
            };
        });

        it("should return input value", () => {
            const setValue = createSetValue(options);
            return setValue(value).then(response => {
                expect(response).to.be.equal(value);
            });
        });
    });

    describe("condition is met and action is a promise", () => {
        let options;
        beforeEach(() => {
            options = {
                condition: () => true,
                action: value => Promise.resolve(value)
            };
        });

        it("should return input value", () => {
            const setValue = createSetValue(options);
            return setValue(value).then(response => {
                expect(response).to.be.equal(value);
            });
        });
    });

    describe("condition is met and has branch", () => {
        let options;
        let mainBranchActionStub;
        let subBranchActionStub;
        beforeEach(() => {
            mainBranchActionStub = sandbox.stub().callsFake(input => input);
            subBranchActionStub = sandbox.stub().callsFake(input => input);
            options = {
                condition: () => true,
                action: mainBranchActionStub,
                branches: {
                    subBranch: Horpyna({
                        condition: () => true,
                        action: subBranchActionStub
                    })
                }
            };
        });

        it("should return input value from branch", () => {
            const setValue = createSetValue(options);
            return setValue(value).then(response => {
                expect(response).to.be.equal(value);
                expect(mainBranchActionStub.calledOnce).to.be.true();
                expect(subBranchActionStub.calledOnce).to.be.true();
            });
        });
    });
});
