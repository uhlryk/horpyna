import Channel from "./channel";
import OutputChannel from "./outputChannel";
import IInputSetValueCallback from "./iInputSetValueCallback";

class InputChannel extends Channel{
  private _onSetValueCallback: IInputSetValueCallback;
  constructor(name: string, onSetValueCallback?: IInputSetValueCallback) {
    super(name);
    if(onSetValueCallback) {
      this.setCallback(onSetValueCallback);
    }
  }

  public setCallback(onSetValueCallback: IInputSetValueCallback): InputChannel {
    this._onSetValueCallback = onSetValueCallback;
    return this;
  }

  public setValue(value: any, sourceOutput: OutputChannel): void {
    this._onSetValueCallback(value, sourceOutput, this);
  }
}
export default InputChannel;
