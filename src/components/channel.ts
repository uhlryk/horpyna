import * as STATUS from "../constants/statuses";
import Component from "./component";

class Channel {
  component: Component;
  name: string;
  status: string;
  connectedChildrenComponents: Component[];
  value: any;

  constructor(component, name) {
    this.component = component;
    this.name = name;
    this.status = STATUS.INIT;
    this.connectedChildrenComponents = [];
    this.value = null;
  }

  addComponent(component) {
    this.connectedChildrenComponents.push(component);
  }

  getComponentList() {
    return this.connectedChildrenComponents;
  }

}
export default Channel;
