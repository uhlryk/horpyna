export default function createChangeAction(options) {
    return newAction => Object.assign({}, options, { action: newAction });
}
