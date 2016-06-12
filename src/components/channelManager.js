import Channel from "./channel";

class ChannelManager {
  constructor() {
    this.channels = {

    }
  }

  createChannel(name) {
    this.channels[name] = new Channel();
  }

  setStatusDone(doneChannel) {
    doneChannel.setStatusDone();
  }

  getChannel(name) {
    return this.channels[name];
  }
}
export default ChannelManager;
