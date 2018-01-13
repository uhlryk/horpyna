import changeObject from "../changeObject";
export default function createChangeCondition(options) {
    return newCondition => changeObject(options, { condition: newCondition });
}
