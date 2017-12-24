import createSetValueAction from "./createSetValueAction";
import createWhenAction from "./createWhenAction";
import createAddBranchAction from "./createAddBranchAction";
export default function createDoAction() {
    return nodeFunction => {
        return {
            setValue: createSetValueAction({ nodeFunction }),
            when: createWhenAction({ nodeFunction }),
            addBranch: createAddBranchAction({ nodeFunction })
        };
    };
}
