import createSetValueAction from "./createSetValueAction";
import createAddBranchAction from "./createAddBranchAction";
export default function createDoAction({ conditionFunction }) {
    return doFunction => {
        return {
            setValue: createSetValueAction({ doFunction, conditionFunction }),
            addBranch: createAddBranchAction({ doFunction, conditionFunction })
        };
    };
}
