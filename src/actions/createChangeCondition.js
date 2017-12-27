import response from "../response";
export default function createChangeCondition(options, debug) {
    debug("create 'changeCondition' function");
    return newCondition => {
        options = Object.assign({}, options, { condition: newCondition });
        debug("call 'changeCondition' function");
        return response(options, debug);
    };
}
