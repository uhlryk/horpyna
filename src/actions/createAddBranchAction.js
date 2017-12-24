import createSetValueAction from "./createSetValueAction";
export default function createAddBranchAction({ doFunction, conditionFunction, childBranchList = [] }) {
    return childBranch => {
        childBranchList = childBranchList.concat(childBranch);
        return {
            addBranch: createAddBranchAction({ doFunction, conditionFunction, childBranchList }),
            setValue: createSetValueAction({ doFunction, conditionFunction, childBranchList })
        };
    };
}
