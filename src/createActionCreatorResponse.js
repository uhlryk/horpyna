export default function createActionCreatorResponse(response, options, debug) {
    return actionCreator => {
        const action = actionCreator(options, debug);
        return (...args) => response(action(...args), debug);
    };
}
