export default function createSetValue({ condition = () => true, action = value => value, branches = {} }, debug) {
    debug("create 'setValue' function");
    return value => {
        debug("call 'setValue' function");
        if (condition(value)) {
            debug("conditions met");
            const actionResult = action(value);
            const childBranchResult = Object.keys(branches).reduce(
                (result, branchName) => (result !== undefined ? result : branches[branchName](actionResult)),
                undefined
            );
            return childBranchResult || actionResult;
        }
    };
}
