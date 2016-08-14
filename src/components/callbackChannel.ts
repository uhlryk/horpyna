import Channel from "./channel";
import OutputChannel from "./outputChannel";
import InputChannel from "./inputChannel";
import ICallbackSetValueCallback from "./iCallbackSetValueCallback";
import * as CHANNEL from "../constants/channels";

class CallbackChannel extends InputChannel {
  private _callback: ICallbackSetValueCallback;
  constructor(onSetValueCallback: ICallbackSetValueCallback) {
    super(CHANNEL.DEFAULT_CHANNEL);
    this.setCallback(onSetValueCallback);
  }

  public setCallback(onSetValueCallback: ICallbackSetValueCallback): CallbackChannel {
    this._callback = onSetValueCallback;
    return this;
  }

  public setValue(value: any, sourceOutput: OutputChannel): void {
    this._callback(value, sourceOutput);
  }
}
export default CallbackChannel;
