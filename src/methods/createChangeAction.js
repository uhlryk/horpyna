import changeObject from "../changeObject";
export default function createChangeAction(options) {
    return newAction => changeObject(options, { action: newAction });
}
