export default function createAddBranch(options) {
    return (branchName, branch) =>
        Object.assign({}, options, {
            branches: Object.assign({}, options.branches, { [branchName]: branch })
        });
}
