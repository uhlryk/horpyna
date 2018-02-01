import executeChain from "./executeChain";
export default function execute(value, { branch: currentBranch }) {
    return executeChain([currentBranch].concat(currentBranch.getChain()), value);
}
