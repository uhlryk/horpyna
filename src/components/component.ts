import ChannelManager from "./channelManager";
import IResponseCallback from "./iResponseCallback";
import Channel from "./channel";
import InputChannel from "./inputChannel";
import OutputChannel from "./outputChannel";
import Response from "./response";
import Request from "./request";
import * as CHANNEL from "../constants/channels";

class Component {
  private _inputChannelManager: ChannelManager;
  private _outputChannelManager: ChannelManager;

  constructor(options) {
    this._inputChannelManager = new ChannelManager();
    this._outputChannelManager = new ChannelManager();
    this._createInputChannel(CHANNEL.DEFAULT_CHANNEL);
    this._createOutputChannel(CHANNEL.DEFAULT_CHANNEL);
    this.onInit(options);
  }

  onInit(options) {}

  onNext(request: Request, response: Response) {
    response.send();
  }

  next(request: Request) {
    let responseCallback: IResponseCallback = (value: any, channelName: string) => {
      this._getOutputChannel(channelName).emitValue(value);
    };
    let response: Response = new Response(responseCallback);
    setTimeout(() => this.onNext(request, response), 0);
  }

  bind(parent: Component, parentChannelName: string = CHANNEL.DEFAULT_CHANNEL, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL): Component {
    let parentOutputChannel: Channel = parent._getOutputChannel(parentChannelName);
    let currentInputChannel: Channel = this._getInputChannel(currentChannelName);
    parentOutputChannel.addChannel(currentInputChannel);
    currentInputChannel.addChannel(parentOutputChannel);
    return this;
  }

  private _getInputChannel(channelName: string): InputChannel {
    return (InputChannel)this._inputChannelManager.getChannel(channelName);
  }

  private _getOutputChannel(channelName: string): OutputChannel {
    return (OutputChannel)this._outputChannelManager.getChannel(channelName);
  }

  private _createInputChannel(channelName: string): Component {
    this._inputChannelManager.addChannel(new InputChannel(this, channelName, (value: any, parentOutput: OutputChannel, currentInput: InputChannel) => {
      this.next(new Request(value, parentOutput, currentInput));
    }));
    return this;
  }

  private _createOutputChannel(channelName: string): Component {
    this._outputChannelManager.addChannel(new OutputChannel(this, channelName));
    return this;
  }

}

export default Component;
