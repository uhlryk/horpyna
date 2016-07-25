import ChannelManager from "./channelManager";

class Channel extends ChannelManager{
  private _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }

  getName(): string {
    return this._name;
  }

}
export default Channel;
