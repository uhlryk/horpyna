import createSetValueAction from "./createSetValueAction";
export default function createAddBranchAction({ doFunction, conditionFunction, childBranchList = {}, debug }) {
    debug("create 'addBranch' method");
    return (branchName, childBranch) => {
        debug("call 'addBranch' function with name", branchName);
        childBranchList = Object.assign({}, childBranchList, { [branchName]: childBranch });
        const setValueAction = createSetValueAction({ doFunction, conditionFunction, childBranchList, debug });
        setValueAction.addBranch = createAddBranchAction({ doFunction, conditionFunction, childBranchList, debug });
        return setValueAction;
    };
}
