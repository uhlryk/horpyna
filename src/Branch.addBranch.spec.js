import Branch from "./Branch";

describe("Branch.addBranch", () => {
    it("should add new branch as an object", () => {
        const mainBranch = new Branch({
            name: "mainBranch"
        });
        mainBranch.addBranch({
            name: "newBranch"
        });
        const branch = mainBranch.getBranch("newBranch");
        expect(branch).to.be.instanceof(Branch);
        expect(branch.getName()).to.be.equal("newBranch");
    });

    it("should add new branch as Branch instance", () => {
        const mainBranch = new Branch({
            name: "mainBranch"
        });
        mainBranch.addBranch(
            new Branch({
                name: "newBranch"
            })
        );
        const branch = mainBranch.getBranch("newBranch");
        expect(branch).to.be.instanceof(Branch);
        expect(branch.getName()).to.be.equal("newBranch");
    });
});
