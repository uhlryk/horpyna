import InputChannel from "./inputChannel";
import OutputChannel from "./outputChannel";

interface IResponseCallback {
  (value: any, parentOutput: OutputChannel, currentInput: InputChannel): void
}

export default IResponseCallback;
