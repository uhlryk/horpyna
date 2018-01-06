import createActionCreatorResponse from "./createActionCreatorResponse";
import createSetValue from "./actions/createSetValue";
import createChangeCondition from "./actions/createChangeCondition";
import createChangeAction from "./actions/createChangeAction";
import createSetBranch from "./actions/createAddBranch";
import createGetBranch from "./actions/createGetBranch";
export default function response(options, debug) {
    options = Object.assign({}, options);
    const setValue = createSetValue(options, debug);
    const actionCreatorResponse = createActionCreatorResponse(response, options, debug);

    setValue.changeCondition = actionCreatorResponse(createChangeCondition);
    setValue.changeAction = actionCreatorResponse(createChangeAction);
    setValue.addBranch = actionCreatorResponse(createSetBranch);
    setValue.getBranch = createGetBranch(options, debug);

    return setValue;
}
