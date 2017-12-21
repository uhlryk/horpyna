import createSetValueAction from "./actions/createSetValueAction";
import createSetConditionAction from "./actions/createSetConditionAction";
export default {
    createNode(actionFunction) {
        console.log("Create node");
        return {
            setValues: createSetValueAction({ actionFunction }),
            setCondition: createSetConditionAction({ actionFunction })
        };
    }
};
