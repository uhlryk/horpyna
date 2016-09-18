import ChannelManager from "./channelManager";
import Component from "./component";

class Channel extends ChannelManager{
  private _name: string;
  private _component: Component;

  constructor(name: string, channels: Channel[] = []) {
    super(channels);
    this._name = name;
  }

  public setComponent(component: Component): Channel {
    this._component = component;
    return this;
  }

  public getComponent(): Component {
    return this._component;
  }

  public getName(): string {
    return this._name;
  }

}
export default Channel;
