import response from "./response";
export default function Horpyna({ name, condition = () => true, action = value => value, branches = {} } = {}) {
    if (!name) {
        throw TypeError("Name should be provided");
    }
    return response({ name, condition, action, branches });
}
