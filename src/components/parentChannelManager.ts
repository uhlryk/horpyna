import Channel from "./channel";
import * as STATUS from "../constants/statuses";

class ParentChannelManager {
  private _channels: Channel[];
  constructor() {
    this._channels = [];
  }

  addChannel(channel) {
    this._channels.push(channel);
  }

  getChannelsValue() {
    return this._channels.map(channel => channel.value);
  }

  isDone() {
    let doneCount = this._channels.reduce((doneCount, channel) => {
      if(channel.status === STATUS.DONE && channel.component.getStatus() === STATUS.DONE) {
        return ++doneCount;
      } else {
        return doneCount;
      }
    }, 0);
    return doneCount === this._channels.length;
  }

}

export default ParentChannelManager;
