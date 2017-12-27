import Promise from "bluebird";
export default function createSetValue({ condition = () => true, action = value => value, branches = {} }, debug) {
    debug("create 'setValue' function");
    return value => {
        debug("call 'setValue' function");
        if (condition(value)) {
            debug("conditions met");
            const actionResult = action(value);
            return Promise.reduce(
                Object.keys(branches),
                (result, branchName) =>
                    result !== null ? Promise.resolve(result) : branches[branchName](actionResult),
                null
            ).then(childBranchResult => childBranchResult || actionResult);
        }
        return Promise.resolve(null);
    };
}
