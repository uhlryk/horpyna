import * as CHANNEL from "../constants/channels";
import Channel from "./channel";
import IResponseCallback from "./iResponseCallback";

class Response {
  private _onSendCallback: IResponseCallback;

  constructor(onSendCallback: IResponseCallback) {
    this._onSendCallback = onSendCallback;
  }

  public send(value: any = undefined, channelName: string = CHANNEL.DEFAULT_CHANNEL): Response {
    this._onSendCallback(value, channelName);
    return this;
  }
}

export default Response;
