export default function createChangeAction(options, debug) {
    debug("create 'changeAction' function");
    return newAction => {
        options = Object.assign({}, options, { action: newAction });
        debug("call 'changeAction' function");
        return options;
    };
}
