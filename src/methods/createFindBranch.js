import getBranch from "./helpers/getBranch";
export default function createFindBranch(options) {
    return branchName =>
        getBranch(options.branches, branchName) ||
        Object.keys(options.branches).reduce(
            (branch, name) => branch || options.branches[name].getBranch(branchName),
            null
        );
}
