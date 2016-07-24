import Component from "./component";
import ChannelManager from "./channelManager";

class Channel extends ChannelManager{
  private _name: string;
  private _component: Component;

  constructor(component: Component, name: string) {
    super();
    this._component = component;
    this._name = name;
  }

  getComponent(): Component {
    return this._component;
  }

  getName(): string {
    return this._name;
  }

}
export default Channel;
