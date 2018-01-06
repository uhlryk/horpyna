export default function createActionCreatorResponse(response, options) {
    return actionCreator => {
        const action = actionCreator(options);
        return (...args) => response(action(...args));
    };
}
