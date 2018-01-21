import Branch from "./Branch";

describe("Branch.getBranch", () => {
    it("should get branch", () => {
        const mainBranch = new Branch({
            name: "mainBranch",
            branches: [
                {
                    name: "newBranch"
                }
            ]
        });
        const branch = mainBranch.getBranch("newBranch");
        expect(branch).to.be.instanceof(Branch);
        expect(branch.getName()).to.be.equal("newBranch");
    });
});
