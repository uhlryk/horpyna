import Channel from "./channel";
import * as STATUS from "../constants/statuses";

class ParentChannelManager {
  constructor() {
    this.channels = [];
  }

  addChannel(channel) {
    this.channels.push(channel);
  }

  getOutput() {
    if(this.channels.length === 1) {
      return { input: this.channels[0].output };
    } else {
      return { input: this.channels.map(channel => channel.output) };
    }
  }

  isDone() {
    let doneCount = this.channels.reduce((doneCount, channel) => {
      if(channel.status === STATUS.DONE && channel.component.status === STATUS.DONE) {
        return ++doneCount;
      } else {
        return doneCount;
      }
    }, 0);
    return doneCount === this.channels.length;
  }

}

export default ParentChannelManager;
