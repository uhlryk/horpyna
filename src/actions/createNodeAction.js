import createSetValueAction from "./createSetValueAction";
import createSetConditionAction from "./createSetConditionAction";
import createSetChildNodeAction from "./createSetChildNodeAction";
export default function createNodeAction() {
    console.log("Create node");
    return nodeFunction => {
        return {
            setValue: createSetValueAction({ nodeFunction }),
            setCondition: createSetConditionAction({ nodeFunction }),
            setChildNode: createSetChildNodeAction({ nodeFunction })
        };
    };
}
