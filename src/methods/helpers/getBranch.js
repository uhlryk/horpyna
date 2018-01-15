export default function getBranchByName(branches, branchName) {
    return branches.find(branch => branch.getName() === branchName) || null;
}
