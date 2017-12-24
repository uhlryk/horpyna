import createSetValueAction from "./createSetValueAction";
import createAddBranchAction from "./createAddBranchAction";
export default function createDoAction({ conditionFunction, debug }) {
    debug("create 'do' method");
    return doFunction => {
        debug("call 'do' function");
        return {
            setValue: createSetValueAction({ doFunction, conditionFunction, debug }),
            addBranch: createAddBranchAction({ doFunction, conditionFunction, debug })
        };
    };
}
