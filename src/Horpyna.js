import response from "./response";
export default function Horpyna({ condition = () => true, action = value => value, branches = {} }) {
    return response({ condition, action, branches });
}
