import Channel from "./channel";

class ChannelManager {

  private _channels: Channel[];

  constructor() {
    this._channels = [];
  }

  public isChannel(channelName: string): boolean {
    return typeof this.getChannel(channelName) !== "undefined";
  }

  public addChannel(channel: Channel): void {
    this._channels.push(channel);
  }


  public getChannel(name: string): Channel {
    return this._channels.find(channel => channel.getName() === name);
  }

  public getChannels(): Channel[] {
    return this._channels;
  }

}
export default ChannelManager;
