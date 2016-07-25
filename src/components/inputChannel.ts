import Channel from "./channel";
import OutputChannel from "./outputChannel";
import IInputSetValueCallback from "./iInputSetValueCallback";

class InputChannel extends Channel{
  private _onSetValueCallback: IInputSetValueCallback;
  constructor(name: string, onSetValueCallback: IInputSetValueCallback) {
    super(name);
    this._onSetValueCallback = onSetValueCallback;
  }

  setValue(value: any, parentOutput: OutputChannel): void {
    this._onSetValueCallback(value, parentOutput, this);
  }
}
export default InputChannel;
