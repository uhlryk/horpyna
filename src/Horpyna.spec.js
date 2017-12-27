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

    describe("when conditions not met", () => {
        describe("when no child branches", () => {
            it("should return undefined", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const mainBranch = Horpyna({ condition: () => false, action: branchFunctionStub });
                const result = mainBranch(valueStub);
                expect(result).to.be.undefined();
                expect(branchFunctionStub.called).to.be.false();
            });
        });
    });

    describe("when main branch conditions met", () => {
        describe("when no child branches", () => {
            it("should return response from main branch 'do' function", () => {
                const responseStub = sandbox.stub();
                const valueStub = sandbox.stub();
                const branchFunctionStub = sandbox.stub().returns(responseStub);
                const mainBranch = Horpyna({ condition: () => true, action: branchFunctionStub });
                const result = mainBranch(valueStub);
                expect(result).to.be.equal(responseStub);
                expect(branchFunctionStub.calledOnce).to.be.true();
                expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
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
                    condition: () => true,
                    action: branchFunctionStub,
                    branches: {
                        subBranchName: Horpyna({ condition: () => true, action: childBranchFunctionStub })
                    }
                });
                const result = mainBranch(valueStub);
                expect(result).to.be.equal(childResponseStub);
                expect(branchFunctionStub.calledOnce).to.be.true();
                expect(branchFunctionStub.getCall(0).args[0]).to.be.eql(valueStub);
                expect(childBranchFunctionStub.calledOnce).to.be.true();
                expect(childBranchFunctionStub.getCall(0).args[0]).to.be.eql(responseStub);
            });
        });
    });

    describe("when searching only direct children", () => {
        describe("when direct child with searched name doesn't exist", () => {
            it("should return undefined", () => {
                const deepChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        searchBranchName: deepChildBranch
                    }
                });
                const mainBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        differentBranchName: directChildBranch
                    }
                });
                expect(mainBranch.getBranch("searchBranchName", false)).to.be.undefined();
            });
        });
        describe("when direct child with searched name exist", () => {
            it("should return direct child", () => {
                const deepChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        differentBranchName: deepChildBranch
                    }
                });
                const mainBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        searchBranchName: directChildBranch
                    }
                });
                expect(mainBranch.getBranch("searchBranchName", false)).to.be.equal(directChildBranch);
            });
        });
    });

    describe("when deep searching", () => {
        describe("when child with searched name doesn't exist", () => {
            it("should return undefined", () => {
                const deepChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        alsoWrongBranchName: deepChildBranch
                    }
                });
                const mainBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        differentBranchName: directChildBranch
                    }
                });
                expect(mainBranch.getBranch("searchBranchName")).to.be.undefined();
            });
        });
        describe("when child with searched name exist", () => {
            it("should return child branch", () => {
                const deepChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value
                });
                const directChildBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        searchBranchName: deepChildBranch
                    }
                });
                const mainBranch = Horpyna({
                    condition: () => true,
                    action: value => value,
                    branches: {
                        differentBranchName: directChildBranch
                    }
                });
                expect(mainBranch.getBranch("searchBranchName")).to.be.equal(deepChildBranch);
            });
        });
    });
});
