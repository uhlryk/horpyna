import Channel from "./channel";

class ChannelManager {

  private _channels: Channel[];

  constructor(channels: Channel[] = []) {
    this._channels = channels;
  }

  public isChannelByName(channelName: string): boolean {
    return typeof this.getChannel(channelName) !== "undefined";
  }

  public isChannel(testChannel: Channel): boolean {
    return this.getChannels().some(channel => channel === testChannel);
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
