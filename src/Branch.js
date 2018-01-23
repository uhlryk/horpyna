import { convertToBranches, convertToBranch } from "./convertToBranches";
import Promise from "bluebird";
export default class Branch {
    constructor({ name, condition = () => true, action = value => value, branches = [] } = {}) {
        if (!name) {
            throw TypeError("Name should be provided");
        }
        this.name = name;
        this.condition = condition;
        this.action = action;
        this.branches = convertToBranches(branches);
    }
    setCondition(newCondition) {
        this.condition = newCondition;
        return this;
    }
    setAction(newAction) {
        this.action = newAction;
        return this;
    }
    addBranch(branch) {
        this.branches.push(convertToBranch(branch));
        return this;
    }
    getBranch(name) {
        return this.branches.find(branch => branch.getName() === name) || null;
    }
    findBranch(searchName) {
        return (
            this.getBranch(searchName) ||
            Object.keys(this.branches).reduce(
                (foundBranch, branchName) => foundBranch || this.branches[branchName].findBranch(searchName),
                null
            )
        );
    }
    getAction() {
        return this.action;
    }
    getCondition() {
        return this.condition;
    }
    getName() {
        return this.name;
    }
    execute(value) {
        if (this.condition(value)) {
            const actionResult = this.action(value);
            return Promise.reduce(
                this.branches,
                (result, branch) => (result !== null ? Promise.resolve(result) : branch.execute(actionResult)),
                null
            ).then(childBranchResult => childBranchResult || actionResult);
        }
        return Promise.resolve(null);
    }
}
