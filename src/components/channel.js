import * as STATUS from "../constants/statuses";

class Channel {
  constructor() {
    this._status = STATUS.INIT;
    this._connectedChildrenComponents = [];
    this._output = null;
  }

  addComponent(component) {
    this._connectedChildrenComponents.push(component);
  }

  getComponentList() {
    return this._connectedChildrenComponents;
  }

  getStatus() {
    return this._status;
  }

  setStatusDone() {
    this._status = STATUS.DONE;
  }

  get output() {
    return this._output;
  }
  set output(value) {
    this._output = value;
  }
}
export default Channel;
