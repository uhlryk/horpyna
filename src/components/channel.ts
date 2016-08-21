import ChannelManager from "./channelManager";

class Channel extends ChannelManager{
  private _name: string;

  constructor(name: string, channels: Channel[] = []) {
    super(channels);
    this._name = name;
  }

  public getName(): string {
    return this._name;
  }

}
export default Channel;
