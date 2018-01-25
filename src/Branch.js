import { convertToBranches, convertToBranch } from "./convertToBranches";
import executeBranch from "./executeBranch";
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
    clone() {
        return new Branch({
            name: this.name,
            condition: this.condition,
            action: this.action,
            branches: this.branches.slice()
        });
    }
    setCondition(newCondition) {
        this.condition = newCondition;
        return this;
    }
    setAction(newAction) {
        this.action = newAction;
        return this;
    }
    setName(newName) {
        this.name = newName;
        return this;
    }
    addBranch(branch) {
        this.branches.push(convertToBranch(branch));
        return this;
    }
    getBranches() {
        return this.branches;
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
        return executeBranch(value, { branch: this });
    }
}
