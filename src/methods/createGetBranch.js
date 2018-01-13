export default function createGetBranch(options) {
    return branchName => options.branches[branchName] || null;
}
