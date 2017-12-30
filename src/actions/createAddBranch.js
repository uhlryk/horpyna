import response from "../response";
export default function createAddBranch(options, debug) {
    debug("create 'addBranch' function");
    return (branchName, branch) => {
        debug("call 'addBranch' function with name", branchName);
        options = Object.assign({}, options, {
            branches: Object.assign({}, options.branches, { [branchName]: branch })
        });
        return response(options, debug);
    };
}
