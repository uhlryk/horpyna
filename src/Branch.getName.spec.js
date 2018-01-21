import Branch from "./Branch";

describe("Branch.getName", () => {
    let branch;

    beforeEach(() => {
        branch = new Branch({ name: "mainBranch" });
    });

    it("should get action", () => {
        expect(branch.getName()).to.be.equal("mainBranch");
    });
});
