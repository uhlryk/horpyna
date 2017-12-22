import createSetValueAction from "./createSetValueAction";
import createSetChildNodeAction from "./createSetChildNodeAction";
export default function createSetConditionAction({ nodeFunction, childNodeList }) {
    return conditionFunction => {
        return {
            setChildNode: createSetChildNodeAction({ nodeFunction, conditionFunction, childNodeList }),
            setValue: createSetValueAction({ nodeFunction, conditionFunction, childNodeList })
        };
    };
}
