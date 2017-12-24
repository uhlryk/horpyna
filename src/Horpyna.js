import createDebug from "debug";
import createWhenAction from "./actions/createWhenAction";
export default {
    when() {
        let debug = createDebug("Horpyna");
        debug("initialize instance");
        return createWhenAction({ debug })(...arguments);
    }
};
