import Promise from "bluebird";
import executeBranch from "./executeBranch";
export default function executeChain(branches, value, index = 0, exceptionHandler = false) {
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
                return executeBranch(value, { branch: currentBranch });
            } else {
                return value;
            }
        })
        .then(
            value => executeChain(branches, value, index + 1, exceptionHandler),
            err => executeChain(branches, err, index + 1, true)
        );
}
