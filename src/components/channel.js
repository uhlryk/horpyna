import * as STATUS from "../constants/statuses";

class Channel {
  constructor(component, name) {
    this.component = component;
    this.name = name;
    this.status = STATUS.INIT;
    this.connectedChildrenComponents = [];
    this.output = null;
  }

  addComponent(component) {
    this.connectedChildrenComponents.push(component);
  }

  getComponentList() {
    return this.connectedChildrenComponents;
  }

}
export default Channel;
