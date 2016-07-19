import Channel from "./channel";
import Component from "./component";

class ChannelManager {
  component: Component;
  channels: Channel[];

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
