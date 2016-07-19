import * as STATUS from "../constants/statuses";
import * as CHANNEL from "../constants/channels";
import Component from "./component";
import Channel from "./channel";
/**
 * Object which is passed to component onProcess method.
 * It allow to set responses to channels of components and then pass it to child components in Request
 */
class Response {
  private _component: Component;
  constructor(component: Component) {
    this._component = component;
  }

  init() {
    this._component._channelManager.channels.forEach((channel:Channel) => {
      channel.status = STATUS.INIT;
      channel.value = null;
    });
  }

  prepare(value, channelName) {
    if(this._component._rootComponent._status === STATUS.PROCESS) {
      channelName = channelName || CHANNEL.DEFAULT_CHANNEL;
      let channel: Channel = this._component.getChannel(channelName);
      channel.status = STATUS.DONE;
      channel.value = value;
    }
  }

  done() {
    if(this._component._rootComponent._status === STATUS.PROCESS) {
      this._component._status = STATUS.DONE;
      if (this._component._finalComponentFlag === false) {
        this._component._channelManager.channels.forEach(channel => {
          if (channel.status === STATUS.DONE) {
            channel.getComponentList().forEach(component => component.onParentReady());
          }
        });
      } else {
        let doneChannelList = [];
        this._component._channelManager.channels.forEach(channel => {
          if (channel.status === STATUS.DONE) {
            doneChannelList.push(channel);
          }
        });
        this._component._rootComponent.finish(doneChannelList);
      }
    }
  }

  send(value, channelName) {
    this.init();
    this.prepare(value, channelName);
    this.done();
  }

}

export default Response;
