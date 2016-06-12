import * as STATUS from "../constants/statuses";

class Channel {
  constructor(name) {
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
