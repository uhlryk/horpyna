export default function getBranchByCondition(branches, value, index = 0, exceptionHandler = false) {
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
