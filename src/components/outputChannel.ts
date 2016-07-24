import Component from "./component";
import Channel from "./channel";
import InputChannel from "./inputChannel";

class OutputChannel extends Channel{

  constructor(component: Component, name: string) {
    super(component, name);
  }

  emitValue(value: any): void {
    let outputs: InputChannel[] = <Array<InputChannel>>this.getChannels();
    outputs.forEach(channel => {
      channel.setValue(value, this);
    });
  }
}
export default OutputChannel;
