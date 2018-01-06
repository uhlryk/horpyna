import Promise from "bluebird";
export default function createSetValue({ condition = () => true, action = value => value, branches = {} }) {
    return value => {
        if (condition(value)) {
            const actionResult = action(value);
            return Promise.reduce(
                Object.keys(branches),
                (result, branchName) =>
                    result !== null ? Promise.resolve(result) : branches[branchName](actionResult),
                null
            ).then(childBranchResult => childBranchResult || actionResult);
        }
        return Promise.resolve(null);
    };
}
