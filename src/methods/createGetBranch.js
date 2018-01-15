import getBranch from "./helpers/getBranch";
export default function createGetBranch(options) {
    return branchName => getBranch(options.branches, branchName);
}
