import createSetValue from "./actions/createSetValue";
import createChangeCondition from "./actions/createChangeCondition";
import createChangeAction from "./actions/createChangeAction";
import createSetBranch from "./actions/createAddBranch";
import createGetBranch from "./actions/createGetBranch";
export default function response(options, debug) {
    options = Object.assign({}, options);
    const setValue = createSetValue(options, debug);
    setValue.changeCondition = createChangeCondition(options, debug);
    setValue.changeAction = createChangeAction(options, debug);
    setValue.addBranch = createSetBranch(options, debug);
    setValue.getBranch = createGetBranch(options, debug);
    return setValue;
}
