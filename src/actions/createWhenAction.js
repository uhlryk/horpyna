import createDoAction from "./createDoAction";
export default function createWhenAction({ debug }) {
    debug("create 'when' method");
    return conditionFunction => {
        debug("call 'when' function");
        return {
            do: createDoAction({ conditionFunction, debug })
        };
    };
}
