import ChannelManager from "./channelManager";
import IResponseCallback from "./iResponseCallback";
import Channel from "./channel";
import InputChannel from "./inputChannel";
import OutputChannel from "./outputChannel";
import IInputSetValueCallback from "./iInputSetValueCallback";
import Response from "./response";
import Request from "./request";
import * as CHANNEL from "../constants/channels";

class Component {
  private _inputChannelManager: ChannelManager;
  private _outputChannelManager: ChannelManager;
  private _callbackChannelManager: ChannelManager;

  constructor(options) {
    this._inputChannelManager = new ChannelManager();
    this._outputChannelManager = new ChannelManager();
    this._callbackChannelManager = new ChannelManager();
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

  bind(child: Component, childChannelName: string = CHANNEL.DEFAULT_CHANNEL, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL): Component {
    let childInput: Channel = child._getInputChannel(childChannelName);
    let currentOutput: Channel = this._getOutputChannel(currentChannelName);
    childInput.addChannel(currentOutput);
    currentOutput.addChannel(childInput);
    return this;
  }

  bindCallback(callback: IInputSetValueCallback, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL, callbackChannelName: string = CHANNEL.DEFAULT_CHANNEL) {
    let callbackChannel: InputChannel = new InputChannel(callbackChannelName, callback);
    this._callbackChannelManager.addChannel(callbackChannel);
    let currentOutput: Channel = this._getOutputChannel(currentChannelName);
    currentOutput.addChannel(callbackChannel);
    return this;
  }

  private _getInputChannel(channelName: string): InputChannel {
    return <InputChannel> this._inputChannelManager.getChannel(channelName);
  }

  private _getOutputChannel(channelName: string): OutputChannel {
    return <OutputChannel> this._outputChannelManager.getChannel(channelName);
  }

  private _createInputChannel(channelName: string): Component {
    let inputSetValueCallback: IInputSetValueCallback = (value: any, parentOutput: OutputChannel, currentInput: InputChannel) => {
      this.next(new Request(value, parentOutput, currentInput));
    };
    this._inputChannelManager.addChannel(new InputChannel(channelName, inputSetValueCallback));
    return this;
  }

  private _createOutputChannel(channelName: string): Component {
    this._outputChannelManager.addChannel(new OutputChannel(channelName));
    return this;
  }

}

export default Component;
