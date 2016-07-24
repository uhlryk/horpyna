import Component from "./component";
import Channel from "./channel";
import OutputChannel from "./outputChannel";

class InputChannel extends Channel{
  private _onSetValueCallback: Function;
  constructor(component: Component, name: string, onSetValueCallback: Function) {
    super(component, name);
    this._onSetValueCallback = onSetValueCallback;
  }

  setValue(value: any, parentOutput: OutputChannel): void {
    this._onSetValueCallback(value, parentOutput, this);
  }
}
export default InputChannel;
