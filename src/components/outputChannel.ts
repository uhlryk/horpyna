import Channel from "./channel";
import InputChannel from "./inputChannel";

class OutputChannel extends Channel{

  constructor(name: string) {
    super(name);
  }

  emitValue(value: any): void {
    const outputs: InputChannel[] = <Array<InputChannel>>this.getChannels();
    outputs.forEach((channel: InputChannel) => {
      channel.setValue(value, this);
    });
  }
}
export default OutputChannel;
