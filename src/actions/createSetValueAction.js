export default function createSetValueAction({
    nodeFunction = null,
    conditionFunction = () => true,
    childNodeList = []
}) {
    return value => {
        if (conditionFunction(value)) {
            const nodeFunctionResult = nodeFunction ? nodeFunction(value) : value;
            const childNodeResult = getFirstChildNodeResult(childNodeList, nodeFunctionResult);
            return childNodeResult || nodeFunctionResult;
        }
    };
}

function getFirstChildNodeResult(childNodeList, nodeFunctionResult) {
    let result;
    childNodeList.find(childNode => (result = childNode.setValue(nodeFunctionResult)));
    return result;
}
