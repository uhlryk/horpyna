import Promise from "bluebird";
import getBranchByCondition from "./getBranchByCondition";
export default function executeBranch(value, { branch: currentBranch }) {
    return Promise.resolve()
        .then(() => currentBranch.action(value))
        .then(
            actionResult =>
                getBranchByCondition(currentBranch.getBranches(), actionResult, 0, false).then(
                    childBranch => (childBranch ? executeBranch(actionResult, { branch: childBranch }) : actionResult)
                ),
            err =>
                getBranchByCondition(currentBranch.getBranches(), err, 0, true).then(
                    childBranch => (childBranch ? executeBranch(err, { branch: childBranch }) : Promise.reject(err))
                )
        );
}
