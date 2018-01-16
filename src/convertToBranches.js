import response from "./response";
export default function convertToBranches(branches) {
    return branches.map(branch => {
        if (branch instanceof Function) {
            return branch;
        } else {
            return response(branch);
        }
    });
}
