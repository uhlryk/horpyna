import response from "../response";
export default function createSetBranch(options, debug) {
    debug("create 'setBranch' function");
    return (branchName, branch) => {
        debug("call 'setBranch' function with name", branchName);
        options = Object.assign({}, options, {
            branches: Object.assign({}, options.branches, { [branchName]: branch })
        });
        return response(options, debug);
    };
}
