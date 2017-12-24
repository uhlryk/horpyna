import createSetValueAction from "./createSetValueAction";
import createWhenAction from "./createWhenAction";
export default function createAddBranchAction({ nodeFunction, conditionFunction, childNodeList = [] }) {
    return childNode => {
        childNodeList = childNodeList.concat(childNode);
        return {
            when: createWhenAction({ nodeFunction, childNodeList }),
            setValue: createSetValueAction({ nodeFunction, conditionFunction, childNodeList })
        };
    };
}
