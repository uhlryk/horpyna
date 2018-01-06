export default function createChangeCondition(options) {
    return newCondition => Object.assign({}, options, { condition: newCondition });
}
