import Branch from "./Branch";
export function convertToBranches(branches) {
    return branches.map(convertToBranch);
}
export function convertToBranch(branch) {
    if (branch instanceof Branch) {
        return branch;
    } else {
        return new Branch(branch);
    }
}
