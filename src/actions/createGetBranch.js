export default function createGetBranch(options, debug) {
    debug("create 'getBranch' function");
    return (branchName, deepSearch = true) => {
        debug("call 'getBranch' function with name", branchName);
        const directChildBranch = options.branches[branchName];
        if (directChildBranch) {
            return directChildBranch;
        }
        if (deepSearch) {
            return Object.keys(options.branches).reduce(
                (branch, name) => branch || options.branches[name].getBranch(branchName, true),
                undefined
            );
        }
    };
}
