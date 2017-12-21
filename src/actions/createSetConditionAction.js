import createSetValueAction from "./createSetValueAction";
export default function createSetConditionAction ({ actionFunction }) {
    return conditionFunction => {
        return {
            setValues: createSetValueAction({ actionFunction, conditionFunction })
        };
    };
}
