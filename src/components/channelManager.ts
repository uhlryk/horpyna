import Channel from "./channel";

class ChannelManager {

  private _channels: Channel[];

  constructor() {
    this._channels = [];
  }

  addChannel(channel: Channel): void {
    this._channels.push(channel);
  }


  getChannel(name: string): Channel {
    return this._channels.find(channel => channel.getName() === name);
  }

  getChannels(): Channel[] {
    return this._channels;
  }

}
export default ChannelManager;
