import InputChannel from "./inputChannel";
import OutputChannel from "./outputChannel";

interface IResponseCallback {
  (value: any, sourceOutput: OutputChannel, targetInput: InputChannel): void
}

export default IResponseCallback;
