import OutputChannel from "./outputChannel";

interface IResponseCallback {
  (value: any, source: OutputChannel ): void
}

export default IResponseCallback;
