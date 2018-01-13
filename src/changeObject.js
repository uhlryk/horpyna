const IMMUTABLE = false;
export default function prepareOptions(options = {}, changes = {}) {
    if (IMMUTABLE) {
        return Object.assign({}, options, changes);
    } else {
        return Object.assign(options, changes);
    }
}
