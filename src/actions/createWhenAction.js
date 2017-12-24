import createDoAction from "./createDoAction";
export default function createWhenAction() {
    return conditionFunction => {
        return {
            do: createDoAction({ conditionFunction })
        };
    };
}
