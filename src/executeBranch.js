import Promise from "bluebird";
export default function executeBranch(value, { branch: currentBranch }) {
    return (
        Promise.resolve()
            // TODO: consider if we want check condition of main/root branch
            .then(() => currentBranch.condition(value))
            .then(conditionResult => (conditionResult ? executeBranchAction(value, { branch: currentBranch }) : value))
    );
}

function executeBranchAction(value, { branch: currentBranch }) {
    return Promise.resolve()
        .then(() => currentBranch.action(value))
        .then(
            actionResult =>
                getBranchByCondition(currentBranch.getBranches(), actionResult, 0, false).then(
                    childBranch =>
                        childBranch ? executeBranchAction(actionResult, { branch: childBranch }) : actionResult
                ),
            err =>
                getBranchByCondition(currentBranch.getBranches(), err, 0, true).then(
                    childBranch =>
                        childBranch ? executeBranchAction(err, { branch: childBranch }) : Promise.reject(err)
                )
        );
}

function getBranchByCondition(branches, value, index = 0, exceptionHandler) {
    if (branches.length <= index) {
        return Promise.resolve(null);
    }
    const branch = branches[index];
    const branchCondition = branch.getCondition();
    return Promise.resolve()
        .then(() => branch.isExceptionHandler() === exceptionHandler && branchCondition(value))
        .then(
            branchValue =>
                branchValue
                    ? Promise.resolve(branch)
                    : getBranchByCondition(branches, value, index + 1, exceptionHandler)
        );
}
