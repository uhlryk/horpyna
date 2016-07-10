import * as STATUS from "../constants/statuses";
import * as CHANNEL from "../constants/channels";

/**
 * Object which is passed to component onProcess method.
 * It allow to set responses to channels of components and then pass it to child components in Request
 */
class Response {
  constructor(component) {
    this.component = component;
  }

  init() {
    this.component.channelManager.channels.forEach(channel => {
      channel.status = STATUS.INIT;
      channel.data = null;
    });
  }

  prepare(data, channelName) {
    if(this.component.rootComponent.status === STATUS.PROCESS) {
      channelName = channelName || CHANNEL.DEFAULT_CHANNEL;
      let channel = this.component.getChannel(channelName);
      channel.status = STATUS.DONE;
      channel.data = data;
    }
  }

  done() {
    if(this.component.rootComponent.status === STATUS.PROCESS) {
      this.component.status = STATUS.DONE;
      if (this.component.finalComponentFlag === false) {
        this.component.channelManager.channels.forEach(channel => {
          if (channel.status === STATUS.DONE) {
            channel.getComponentList().forEach(component => component.onParentReady());
          }
        });
      } else {
        let doneChannelList = [];
        this.component.channelManager.channels.forEach(channel => {
          if (channel.status === STATUS.DONE) {
            doneChannelList.push(channel);
          }
        });
        this.component.rootComponent.finish(doneChannelList);
      }
    }
  }

  send(data, channelName) {
    this.init();
    this.prepare(data, channelName);
    this.done();
  }

}

export default Response;
