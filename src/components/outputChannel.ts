import Channel from "./channel";
import InputChannel from "./inputChannel";

class OutputChannel extends Channel{

  constructor(name: string) {
    super(name);
  }

  emitValue(value: any): void {
    let outputs: InputChannel[] = <Array<InputChannel>>this.getChannels();
    outputs.forEach(channel => {
      channel.setValue(value, this);
    });
  }
}
export default OutputChannel;
