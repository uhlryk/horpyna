import changeObject from "../changeObject";
export default function createAddBranch(options) {
    return (branchName, branch) =>
        changeObject(options, {
            branches: changeObject(options.branches, { [branchName]: branch })
        });
}
