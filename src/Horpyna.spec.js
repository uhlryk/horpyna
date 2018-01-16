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

    it("should use default values and return given value", () => {
        const mainBranch = Horpyna({ name: "mainBranch" });
        return mainBranch(10).then(result => {
            expect(result).to.be.equal(10);
            expect(mainBranch.getName()).to.be.equal("mainBranch");
        });
    });

    it("should use 'new' keyword default values and return given value", () => {
        const mainBranch = new Horpyna({ name: "mainBranch" });
        return mainBranch(10).then(result => {
            expect(result).to.be.equal(10);
            expect(mainBranch.getName()).to.be.equal("mainBranch");
        });
    });

    it("should convert branch objects to Branch instances", () => {
        const mainBranch = new Horpyna({
            name: "mainBranch",
            branches: [
                {
                    name: "subBranch"
                },
                Horpyna({ name: "otherSubBranch" })
            ]
        });
        const subBranch = mainBranch.getBranch("subBranch");
        expect(subBranch).to.be.an.instanceof(Function);
        expect(subBranch).to.have.property("getName");
        expect(subBranch.getName()).to.be.equal("subBranch");

        const otherSubBranch = mainBranch.getBranch("otherSubBranch");
        expect(otherSubBranch).to.be.an.instanceof(Function);
        expect(otherSubBranch).to.have.property("getName");
        expect(otherSubBranch.getName()).to.be.equal("otherSubBranch");
    });
    describe("when conditions not met", () => {
        describe("when no child branches", () => {
            it("should return undefined", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const mainBranch = Horpyna({ name: "mainBranch", condition: () => false, action: branchFunctionStub });
                return mainBranch(valueStub).then(result => {
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
                const mainBranch = Horpyna({ name: "mainBranch", condition: () => true, action: branchFunctionStub });
                return mainBranch(valueStub).then(result => {
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
                const mainBranch = Horpyna({
                    name: "mainBranch",
                    condition: () => true,
                    action: branchFunctionStub,
                    branches: [
                        Horpyna({
                            name: "subBranchName",
                            condition: () => true,
                            action: childBranchFunctionStub
                        })
                    ]
                });
                return mainBranch(valueStub).then(result => {
                    expect(result).to.be.equal(childResponseStub);
                    expect(branchFunctionStub.calledOnce).to.be.true();
                    expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
                    expect(childBranchFunctionStub.calledOnce).to.be.true();
                    expect(childBranchFunctionStub.getCall(0).args[0]).to.be.eql(responseStub);
                });
            });
        });
    });

    describe("when searching only direct children", () => {
        describe("when direct child with searched name doesn't exist", () => {
            it("should return undefined", () => {
                const deepChildBranch = Horpyna({
                    name: "deepChildBranch",
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    name: "directChildBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [deepChildBranch]
                });
                const mainBranch = Horpyna({
                    name: "mainBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [directChildBranch]
                });
                expect(mainBranch.getBranch("searchBranchName")).to.be.null();
            });
        });
        describe("when direct child with searched name exist", () => {
            it("should return direct child", () => {
                const deepChildBranch = Horpyna({
                    name: "deepChildBranch",
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    name: "directChildBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [deepChildBranch]
                });
                const mainBranch = Horpyna({
                    name: "mainBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [directChildBranch]
                });
                expect(mainBranch.getBranch("directChildBranch")).to.be.equal(directChildBranch);
            });
        });
    });

    describe("searching for branch", () => {
        describe("when child with searched name doesn't exist", () => {
            it("should return undefined", () => {
                const deepChildBranch = Horpyna({
                    name: "deepChildBranch",
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    name: "directChildBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [deepChildBranch]
                });
                const mainBranch = Horpyna({
                    name: "mainBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [directChildBranch]
                });
                expect(mainBranch.getBranch("searchBranchName")).to.be.null();
            });
        });
        describe("when child with searched name exist", () => {
            it("should return child branch", () => {
                const deepChildBranch = Horpyna({
                    name: "searchBranchName",
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    name: "directChildBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [deepChildBranch]
                });
                const mainBranch = Horpyna({
                    name: "mainBranch",
                    condition: () => true,
                    action: value => value,
                    branches: [directChildBranch]
                });
                expect(mainBranch.findBranch("searchBranchName")).to.be.equal(deepChildBranch);
            });
        });
    });

    it("should iterate ten times over main branch", () => {
        const mainBranch = Horpyna({
            name: "mainBranch",
            condition: value => value < 10,
            action: value => ++value,
            branches: [
                Horpyna({
                    name: "finishBranch",
                    condition: value => value => 10,
                    action: () => "success"
                })
            ]
        });
        mainBranch.addBranch(mainBranch);
        return mainBranch(0).then(result => {
            expect(result).to.be.eql("success");
        });
    });

    it("should throw error when name is not provided", () => {
        expect(() => {
            Horpyna();
        }).to.throw("Name should be provided");
    });
});
