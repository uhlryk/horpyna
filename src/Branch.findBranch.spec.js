import Branch from "./Branch";

describe("Branch.findBranch", () => {
    describe("when child with searched name doesn't exist", () => {
        it("should return undefined", () => {
            const deepChildBranch = new Branch({
                name: "deepChildBranch",
                condition: () => true,
                action: value => value
            });
            const directChildBranch = new Branch({
                name: "directChildBranch",
                condition: () => true,
                action: value => value,
                branches: [deepChildBranch]
            });
            const mainBranch = new Branch({
                name: "mainBranch",
                condition: () => true,
                action: value => value,
                branches: [directChildBranch]
            });
            expect(mainBranch.findBranch("searchBranchName")).to.be.null();
        });
    });
    describe("when child with searched name exist", () => {
        it("should return child branch", () => {
            const deepChildBranch = new Branch({
                name: "searchBranchName",
                condition: () => true,
                action: value => value
            });
            const directChildBranch = new Branch({
                name: "directChildBranch",
                condition: () => true,
                action: value => value,
                branches: [deepChildBranch]
            });
            const mainBranch = new Branch({
                name: "mainBranch",
                condition: () => true,
                action: value => value,
                branches: [directChildBranch]
            });
            expect(mainBranch.findBranch("searchBranchName")).to.be.equal(deepChildBranch);
        });
    });
});
