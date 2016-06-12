import Channel from "./channel";

class ChannelManager {
  constructor() {
    this.channels = {

    }
  }

  createChannel(name) {
    this.channels[name] = new Channel();
  }

  setStatusProcess() {
    Object.keys(this.channels).forEach(key => {
      let channel = this.channels[key];
      channel.setStatusProcess();
    });
  }

  setStatusDone(doneChannel) {
    Object.keys(this.channels).forEach(key => {
      let channel = this.channels[key];
      if(channel === doneChannel) {
        channel.setStatusDone();
      } else {
        channel.setStatusInit();
      }
    });
  }

  getChannel(name) {
    return this.channels[name];
  }
}
export default ChannelManager;
