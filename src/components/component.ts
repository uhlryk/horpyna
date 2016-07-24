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
    this.createInputChannel(CHANNEL.DEFAULT_CHANNEL);
    this.createOutputChannel(CHANNEL.DEFAULT_CHANNEL);

    this.onInit(options);
  }

  /**
   * for override
   * It is for initialize component
   */
  onInit(options) {}

  onNext(request: Request, response: Response) {
    response.send();
  }

  next(request: Request) {
    let responseCallback: IResponseCallback = (value: any, channelName: string) => {
      this.getOutputChannel(channelName).emitValue(value);
    };
    let response: Response = new Response(responseCallback);
    setTimeout(() => this.onNext(request, response), 0);
  }

  getInputChannel(channelName: string): InputChannel {
    return (InputChannel)this._inputChannelManager.getChannel(channelName);
  }

  getOutputChannel(channelName: string): OutputChannel {
    return (OutputChannel)this._outputChannelManager.getChannel(channelName);
  }

  getOutputChannels() : Channel[] {
    return this._outputChannelManager.getChannels();
  }

  createInputChannel(channelName: string): Component {
    this._inputChannelManager.addChannel(new InputChannel(this, channelName, (value: any, parentOutput: OutputChannel, currentInput: InputChannel) => {
      this.next(new Request(value, parentOutput, currentInput));
    }));
    return this;
  }

  createOutputChannel(channelName: string): Component {
    this._outputChannelManager.addChannel(new OutputChannel(this, channelName));
    return this;
  }

  bind(parent: Component, parentChannelName: string = CHANNEL.DEFAULT_CHANNEL, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL): Component {
    let parentOutputChannel: Channel = parent.getOutputChannel(parentChannelName);
    let currentInputChannel: Channel = this.getInputChannel(currentChannelName);
    parentOutputChannel.addChannel(currentInputChannel);
    currentInputChannel.addChannel(parentOutputChannel);

    return this;

  }

}

export default Component;
