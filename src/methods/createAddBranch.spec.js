import createAddBranch from "./createAddBranch";

describe("createAddBranch", () => {
    let sandbox;
    let oldBranchStub;
    let newBranchStub;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        oldBranchStub = sandbox.stub();
        newBranchStub = sandbox.stub();
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
            const addBranch = createAddBranch(options);
            const newOptions = addBranch("testBranch", newBranchStub);
            expect(newOptions).to.be.equal(options);
        });
    });

    describe("options doesn't contain any branches", () => {
        let options;
        beforeEach(() => {
            options = {};
        });

        it("should return options with new branch", () => {
            const addBranch = createAddBranch(options);
            const newOptions = addBranch("testBranch", newBranchStub);
            expect(newOptions).to.have.deep.property("branches", { testBranch: newBranchStub });
        });
    });

    describe("options contains branch", () => {
        let options;
        beforeEach(() => {
            options = {
                branches: {
                    existingBranch: oldBranchStub
                }
            };
        });

        it("should return options with both branches", () => {
            const addBranch = createAddBranch(options);
            const newOptions = addBranch("testBranch", newBranchStub);
            expect(newOptions).to.have.deep.property("branches", {
                testBranch: newBranchStub,
                existingBranch: oldBranchStub
            });
        });
    });
});
