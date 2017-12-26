import createSetValueAction from "./createSetValueAction";
import createAddBranchAction from "./createAddBranchAction";
export default function createDoAction({ conditionFunction, debug }) {
    debug("create 'do' method");
    return doFunction => {
        debug("call 'do' function");
        const setValueAction = createSetValueAction({ doFunction, conditionFunction, debug });
        setValueAction.addBranch = createAddBranchAction({ doFunction, conditionFunction, debug });
        return setValueAction;
    };
}
