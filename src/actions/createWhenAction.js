import createSetValueAction from "./createSetValueAction";
import createAddBranchAction from "./createAddBranchAction";
export default function createWhenAction({ nodeFunction, childNodeList }) {
    return conditionFunction => {
        return {
            addBranch: createAddBranchAction({ nodeFunction, conditionFunction, childNodeList }),
            setValue: createSetValueAction({ nodeFunction, conditionFunction, childNodeList })
        };
    };
}
