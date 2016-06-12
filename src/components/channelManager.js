import Channel from "./channel";

class ChannelManager {
  constructor() {
    this.channels = [];
  }

  createChannel(name) {
    this.channels.push(new Channel(name));
  }

  getChannel(name) {
    return this.channels.find(channel => channel.name === name);
  }
}
export default ChannelManager;
