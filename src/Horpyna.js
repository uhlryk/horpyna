import createSetValueAction from "./actions/createSetValueAction";
import createSetConditionAction from "./actions/createSetConditionAction";
import createSetChildNodeAction from "./actions/createSetChildNodeAction";
export default {
    createNode(nodeFunction) {
        console.log("Create node");
        return {
            setValue: createSetValueAction({ nodeFunction }),
            setCondition: createSetConditionAction({ nodeFunction }),
            setChildNode: createSetChildNodeAction({ nodeFunction })
        };
    }
};
