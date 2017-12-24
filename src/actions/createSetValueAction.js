export default function createSetValueAction({
    doFunction = null,
    conditionFunction = () => true,
    childBranchList = []
}) {
    return value => {
        if (conditionFunction(value)) {
            const doFunctionResult = doFunction ? doFunction(value) : value;
            const childBranchResult = getFirstChildBranchResult(childBranchList, doFunctionResult);
            return childBranchResult || doFunctionResult;
        }
    };
}

function getFirstChildBranchResult(childBranchList, doFunctionResult) {
    let result;
    childBranchList.find(childNode => (result = childNode.setValue(doFunctionResult)));
    return result;
}
