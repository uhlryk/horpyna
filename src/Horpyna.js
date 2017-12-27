import createDebug from "debug";
import response from "./response";
export default function Horpyna({ condition = () => true, action = value => value, branches = {} }) {
    let debug = createDebug("Horpyna");
    debug("initialize instance");
    return response({ condition, action, branches }, debug);
}
