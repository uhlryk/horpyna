import Horpyna from "../Horpyna";
import createAddBranch from "./createAddBranch";

describe("createAddBranch", () => {
    let sandbox;
    let oldBranchStub;
    let newBranchStub;
    let newObjectBranchStub;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        oldBranchStub = Horpyna({ name: "oldBranch" });
        newBranchStub = Horpyna({ name: "newBranch" });
        newObjectBranchStub = { name: "newBranch" };
    });

    afterEach(async () => {
        sandbox.restore();
    });

    describe("method is mutable", () => {
        let options;
        beforeEach(() => {
            options = { branches: [] };
        });

        it("should return same options object", () => {
            const addBranch = createAddBranch(options);
            const newOptions = addBranch(newBranchStub);
            expect(newOptions).to.be.equal(options);
        });
    });

    describe("options doesn't contain any branches", () => {
        let options;
        beforeEach(() => {
            options = { branches: [] };
        });

        it("should return options with new branch", () => {
            const addBranch = createAddBranch(options);
            const newOptions = addBranch(newBranchStub);
            expect(newOptions).to.have.deep.property("branches", [newBranchStub]);
        });

        describe("new branch is an object", () => {
            it("should return options with new branch", () => {
                const addBranch = createAddBranch(options);
                const newOptions = addBranch(newObjectBranchStub);
                expect(newOptions).to.have.deep.property("branches");
                expect(newOptions.branches[0]).to.be.instanceof(Function);
            });
        });
    });

    describe("options contains branch", () => {
        let options;
        beforeEach(() => {
            options = {
                branches: [oldBranchStub]
            };
        });

        it("should return options with both branches", () => {
            const addBranch = createAddBranch(options);
            const newOptions = addBranch(newBranchStub);
            expect(newOptions).to.have.property("branches");
            expect(newOptions.branches[0]).to.be.equal(oldBranchStub);
            expect(newOptions.branches[1]).to.be.equal(newBranchStub);
        });
    });
});
