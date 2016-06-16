import * as STATUS from "../constants/statuses";
import * as CHANNEL from "../constants/channels";

class Response {
  constructor(component) {
    this.component = component;
  }

  init() {
    this.component.channelManager.channels.forEach(channel => {
      channel.status = STATUS.INIT;
      channel.output = null;
    });
  }

  prepare(output, channelName) {
    if(this.component.rootComponent.status === STATUS.PROCESS) {
      channelName = channelName || CHANNEL.DEFAULT_CHANNEL;
      let channel = this.component.getChannel(channelName);
      channel.status = STATUS.DONE;
      channel.output = output;
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
        let output = [];
        this.component.channelManager.channels.forEach(channel => {
          if (channel.status === STATUS.DONE) {
            output.push(channel.output);
          }
        });
        if(output.length === 1) {
          output = output[0];
        }
        this.component.rootComponent.finish(output);
      }
    }
  }

  send(output, channelName) {
    this.init();
    this.prepare(output, channelName);
    this.done();
  }

}

export default Response;
