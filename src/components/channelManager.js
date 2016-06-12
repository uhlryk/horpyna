import Channel from "./channel";

class ChannelManager {
  constructor(component) {
    this.component = component;
    this.channels = [];
  }

  createChannel(name) {
    this.channels.push(new Channel(this.component, name));
  }

  getChannel(name) {
    return this.channels.find(channel => channel.name === name);
  }
}
export default ChannelManager;
