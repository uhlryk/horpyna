import changeObject from "../changeObject";
export default function createAddBranch(options) {
    return branch =>
        changeObject(options, {
            branches: options.branches.concat(branch)
        });
}
