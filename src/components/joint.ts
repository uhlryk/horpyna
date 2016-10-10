import Channel from "./channel";
import * as ERROR from "../constants/errors";

class Joint {
  private _source: Channel;
  private _target: Channel;
  private _name: string;
  // TODO: Join should be responsible for connection Channels - now it only participated and help channels to connect each other
  constructor(name: string, source: Channel, target: Channel) {
    this._name = name;
    this._source = source;
    this._target = target;
    this._join(this.getSource(), this.getTarget());
  }

  public getName(): string {
    return this._name;
  }

  private _join(source: Channel, target: Channel): Joint {
    if(target.isChannel(source) === false && source.isChannel(target) === false) {
      target.addChannel(source);
      source.addChannel(target);
    } else {
      throw Error(ERROR.ONE_JOINT_PER_CHANNEL_PAIR);
    }
    return this;
  }

  public getSource(): Channel {
    return this._source;
  }

  public getTarget(): Channel {
    return this._target;
  }

}
export default Joint;
