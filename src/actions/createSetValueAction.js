export default function createSetValueAction({
    doFunction = null,
    conditionFunction = () => true,
    childBranchList = {},
    debug
}) {
    debug("create 'setValue' method");
    return value => {
        debug("call 'setValue' function");
        if (conditionFunction(value)) {
            debug("conditions met");
            const doFunctionResult = doFunction ? doFunction(value) : value;
            const childBranchResult = getFirstChildBranchResult(childBranchList, doFunctionResult);
            return childBranchResult || doFunctionResult;
        }
    };
}

function getFirstChildBranchResult(childBranchList, doFunctionResult) {
    let result;
    Object.keys(childBranchList).find(branchName => (result = childBranchList[branchName](doFunctionResult)));
    return result;
}
