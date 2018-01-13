export default function createFindBranch(options) {
    return branchName =>
        options.branches[branchName] ||
        Object.keys(options.branches).reduce(
            (branch, name) => branch || options.branches[name].getBranch(branchName, true),
            null
        );
}
