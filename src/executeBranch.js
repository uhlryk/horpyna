import Promise from "bluebird";
export default function executeBranch(value, { branch: currentBranch }) {
    return executeChain([currentBranch].concat(currentBranch.getChain()), value);
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
            conditionResult =>
                conditionResult
                    ? Promise.resolve(branch)
                    : getBranchByCondition(branches, value, index + 1, exceptionHandler)
        );
}

function executeChain(branches, value, index = 0, exceptionHandler = false) {
    if (branches.length <= index) {
        if (exceptionHandler === false) {
            return Promise.resolve(value);
        } else {
            return Promise.reject(value);
        }
    }
    const currentBranch = branches[index];
    const branchCondition = currentBranch.getCondition();
    return Promise.resolve()
        .then(() => currentBranch.isExceptionHandler() === exceptionHandler && branchCondition(value))
        .then(conditionResult => {
            if (conditionResult) {
                exceptionHandler = false;
                return executeBranchAction(value, { branch: currentBranch });
            } else {
                return value;
            }
        })
        .then(
            value => executeChain(branches, value, index + 1, exceptionHandler),
            err => executeChain(branches, err, index + 1, true)
        );
}
