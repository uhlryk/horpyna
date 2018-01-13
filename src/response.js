import createActionCreatorResponse from "./createActionCreatorResponse";
import createSetValue from "./methods/createSetValue";
import createChangeCondition from "./methods/createChangeCondition";
import createChangeAction from "./methods/createChangeAction";
import createSetBranch from "./methods/createAddBranch";
import createGetBranch from "./methods/createGetBranch";
import createFindBranch from "./methods/createFindBranch";
export default function response(options) {
    const setValue = createSetValue(options);
    const actionCreatorResponse = createActionCreatorResponse(response, options);

    setValue.changeCondition = actionCreatorResponse(createChangeCondition);
    setValue.changeAction = actionCreatorResponse(createChangeAction);
    setValue.addBranch = actionCreatorResponse(createSetBranch);
    setValue.getBranch = createGetBranch(options);
    setValue.findBranch = createFindBranch(options);

    return setValue;
}
