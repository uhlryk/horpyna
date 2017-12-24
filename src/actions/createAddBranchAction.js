import createSetValueAction from "./createSetValueAction";
export default function createAddBranchAction({ doFunction, conditionFunction, childBranchList = [], debug }) {
    debug("create 'addBranch' method");
    return childBranch => {
        debug("call 'addBranch' function");
        childBranchList = childBranchList.concat(childBranch);
        return {
            addBranch: createAddBranchAction({ doFunction, conditionFunction, childBranchList, debug }),
            setValue: createSetValueAction({ doFunction, conditionFunction, childBranchList, debug })
        };
    };
}
