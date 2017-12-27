export default function createSetValue({ condition = () => true, action = value => value, branches = {} }, debug) {
    debug("create 'setValue' function");
    return value => {
        debug("call 'setValue' function");
        if (condition(value)) {
            debug("conditions met");
            const actionResult = action(value);
            const childBranchResult = getFirstChildBranchResult(branches, actionResult);
            return childBranchResult || actionResult;
        }
    };
}

function getFirstChildBranchResult(branches, actionResult) {
    let childBranchResult;
    Object.keys(branches).find(branchName => (childBranchResult = branches[branchName](actionResult)));
    return childBranchResult;
}
