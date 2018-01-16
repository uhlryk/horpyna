import changeObject from "../changeObject";
import convertToBranches from "../convertToBranches";
export default function createAddBranch(options) {
    return branch =>
        changeObject(options, {
            branches: convertToBranches(options.branches.concat(branch))
        });
}
