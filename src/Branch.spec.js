/* eslint-disable no-unused-vars, no-new */
import Branch from "./Branch";

describe("Branch", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    it("should use default values and return given value", () => {
        const mainBranch = new Branch({ name: "mainBranch" });
        return mainBranch.setValue(10).then(result => {
            expect(result).to.be.equal(10);
            expect(mainBranch.getName()).to.be.equal("mainBranch");
        });
    });

    it("should convert branch objects to Branch instances", () => {
        const mainBranch = new Branch({
            name: "mainBranch",
            branches: [
                {
                    name: "subBranch"
                },
                new Branch({ name: "otherSubBranch" })
            ]
        });
        const subBranch = mainBranch.getBranch("subBranch");
        expect(subBranch).to.be.an.instanceof(Branch);
        expect(subBranch).to.have.property("getName");
        expect(subBranch.getName()).to.be.equal("subBranch");

        const otherSubBranch = mainBranch.getBranch("otherSubBranch");
        expect(otherSubBranch).to.be.an.instanceof(Branch);
        expect(otherSubBranch).to.have.property("getName");
        expect(otherSubBranch.getName()).to.be.equal("otherSubBranch");
    });
    describe("when conditions not met", () => {
        describe("when no child branches", () => {
            it("should return undefined", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const mainBranch = new Branch({
                    name: "mainBranch",
                    condition: () => false,
                    action: branchFunctionStub
                });
                return mainBranch.setValue(valueStub).then(result => {
                    expect(result).to.be.null();
                    expect(branchFunctionStub.called).to.be.false();
                });
            });
        });
    });

    describe("when main branch conditions met", () => {
        describe("when no child branches", () => {
            it("should return response from main branch 'do' function", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const mainBranch = new Branch({
                    name: "mainBranch",
                    condition: () => true,
                    action: branchFunctionStub
                });
                return mainBranch.setValue(valueStub).then(result => {
                    expect(result).to.be.equal(responseStub);
                    expect(branchFunctionStub.calledOnce).to.be.true();
                    expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
                });
            });
        });

        describe("when one child branch without conditions", () => {
            it("should return response from child branch 'do' function", () => {
                const responseStub = sandbox.stub();
                const childResponseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const childBranchFunctionStub = sandbox.stub().returns(childResponseStub);
                const mainBranch = new Branch({
                    name: "mainBranch",
                    condition: () => true,
                    action: branchFunctionStub,
                    branches: [
                        new Branch({
                            name: "subBranchName",
                            condition: () => true,
                            action: childBranchFunctionStub
                        })
                    ]
                });
                return mainBranch.setValue(valueStub).then(result => {
                    expect(result).to.be.equal(childResponseStub);
                    expect(branchFunctionStub.calledOnce).to.be.true();
                    expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
                    expect(childBranchFunctionStub.calledOnce).to.be.true();
                    expect(childBranchFunctionStub.getCall(0).args[0]).to.be.eql(responseStub);
                });
            });
        });
    });

    it("should iterate ten times over main branch", () => {
        const mainBranch = new Branch({
            name: "mainBranch",
            condition: value => value < 10,
            action: value => ++value,
            branches: [
                new Branch({
                    name: "finishBranch",
                    condition: value => value => 10,
                    action: () => "success"
                })
            ]
        });
        mainBranch.addBranch(mainBranch);
        return mainBranch.setValue(0).then(result => {
            expect(result).to.be.eql("success");
        });
    });

    it("should throw error when name is not provided", () => {
        expect(() => {
            new Branch();
        }).to.throw("Name should be provided");
    });
});
