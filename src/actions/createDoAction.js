import createSetValueAction from "./createSetValueAction";
import createWhenAction from "./createWhenAction";
import createSetChildNodeAction from "./createSetChildNodeAction";
export default function createDoAction() {
    return nodeFunction => {
        return {
            setValue: createSetValueAction({ nodeFunction }),
            when: createWhenAction({ nodeFunction }),
            setChildNode: createSetChildNodeAction({ nodeFunction })
        };
    };
}
