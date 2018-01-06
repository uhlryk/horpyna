export default function createGetBranch(options) {
    return (branchName, deepSearch = true) => {
        const directChildBranch = options.branches[branchName];
        if (directChildBranch) {
            return directChildBranch;
        }
        if (deepSearch) {
            return Object.keys(options.branches).reduce(
                (branch, name) => branch || options.branches[name].getBranch(branchName, true),
                null
            );
        }
    };
}
