import createSetValueAction from "./createSetValueAction";
import createSetConditionAction from "./createSetConditionAction";
export default function createSetChildNodeAction({ nodeFunction, conditionFunction, childNodeList = [] }) {
    return childNode => {
        childNodeList = childNodeList.concat(childNode);
        return {
            setCondition: createSetConditionAction({ nodeFunction, childNodeList }),
            setValue: createSetValueAction({ nodeFunction, conditionFunction, childNodeList })
        };
    };
}
