import response from "./response";
import convertToBranches from "./convertToBranches";
export default function Horpyna({ name, condition = () => true, action = value => value, branches = [] } = {}) {
    if (!name) {
        throw TypeError("Name should be provided");
    }
    return response({ name, condition, action, branches: convertToBranches(branches) });
}
