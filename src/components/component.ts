import ChannelManager from "./channelManager";
import IResponseCallback from "./iResponseCallback";
import Channel from "./channel";
import InputChannel from "./inputChannel";
import CallbackChannel from "./callbackChannel";
import OutputChannel from "./outputChannel";
import IInputSetValueCallback from "./iInputSetValueCallback";
import ICallbackSetValueCallback from "./iCallbackSetValueCallback";
import Response from "./response";
import Request from "./request";
import Joint from "./joint";
import State from "./state";
import Structure from "./structure";
import * as CHANNEL from "../constants/channels";
import * as ERROR from "../constants/errors";

class Component {
  private _inputChannelManager: ChannelManager;
  private _outputChannelManager: ChannelManager;
  private _state: State;
  private _structure: Structure;

  constructor(options:any) {
    this._state = new State();
    this._structure = new Structure();
    this._inputChannelManager = new ChannelManager();
    this._outputChannelManager = new ChannelManager();
    this.createInputChannel(CHANNEL.DEFAULT_CHANNEL);
    this.createOutputChannel(CHANNEL.DEFAULT_CHANNEL);
    this.createOutputChannel(CHANNEL.ERROR_CHANNEL);
    this.onInit(options);
  }

  public onInit(options:any) {}

  public onNext(request: Request, response: Response, structure: Structure) {
    response.send(request.getValue());
  }

  public setInput(value:any, targetChannelName: string = CHANNEL.DEFAULT_CHANNEL): Component {
    return this.next(new Request(value, null, this.getInputChannel(targetChannelName)));
  }

  public next(request: Request): Component {
    const response: Response = new Response(this._getResponseCallback());
    setTimeout(() => {
      try {
        this.onNext(request, response, this.getStructure());
      } catch(error) {
        response.send(error, CHANNEL.ERROR_CHANNEL);
      }
    }, 0);
    return this;
  }

  public createJoint(target: Component, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL, targetChannelName: string = CHANNEL.DEFAULT_CHANNEL): Joint {
    return new Joint(target.getInputChannel(targetChannelName), this.getOutputChannel(currentChannelName));
  }

  public addCallback(target: ICallbackSetValueCallback, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL): Joint {
    return new Joint(this.getOutputChannel(currentChannelName), new CallbackChannel(target));
  }

  private _getResponseCallback(): IResponseCallback {
    return (value: any, channelName: string) => {
      this.getOutputChannel(channelName).emitValue(value);
    };
  }

  public getStructure(): Structure {
    return this._structure;
  }

  public setState(value: any): Component {
    this._state.setState(value);
    return this;
  }

  public getState(): any {
    return this._state.getState();
  }

  public clearState(): Component {
    this._state.clearState();
    return this;
  }

  public isInputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): boolean {
    return this._inputChannelManager.isChannelByName(channelName);
  }

  public isOutputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): boolean {
    return this._outputChannelManager.isChannelByName(channelName);
  }

  public getInputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): InputChannel {
    if(this.isInputChannel(channelName) === false) {
      throw Error(ERROR.NON_EXIST_CHANNEL);
    }
    return <InputChannel> this._inputChannelManager.getChannel(channelName);
  }

  public getOutputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): OutputChannel {
    if(this.isOutputChannel(channelName) === false) {
      throw Error(ERROR.NON_EXIST_CHANNEL);
    }
    return <OutputChannel> this._outputChannelManager.getChannel(channelName);
  }

  public _getInputChannelSetValueCallback(): IInputSetValueCallback {
    return (value: any, sourceOutput: OutputChannel, currentInput: InputChannel) => {
      this.next(new Request(value, sourceOutput, currentInput));
    };
  }

  public createInputChannel(channelName: string): Component {
    if(this.isInputChannel(channelName) === true) {
      throw Error(ERROR.UNIQUE_NAME_INPUT_CHANNEL);
    }
    this._inputChannelManager.addChannel(new InputChannel(channelName, this._getInputChannelSetValueCallback()));
    return this;
  }

  public createOutputChannel(channelName: string): Component {
    if(this.isOutputChannel(channelName) === true) {
      throw Error(ERROR.UNIQUE_NAME_OUTPUT_CHANNEL);
    }
    this._outputChannelManager.addChannel(new OutputChannel(channelName));
    return this;
  }

}

export default Component;
