import * as STATUS from "../constants/statuses";

class Root {
  constructor() {
    this.components = [];
    this.status = STATUS.INIT;
  }

  addComponent(component) {
    this.components.push(component);
  }

  /**
   * triggered once from root component. It start all process.
   * It need to have connection ready.
   */
  run(endCallback) {
    this.endCallback = endCallback;
    this.status = STATUS.PROCESS;
  }

  finish(output) {
    this.status = STATUS.DONE;
    if(this.endCallback) {
      this.endCallback(output);
    }
  }

  /**
   * allow to join two rootComponents to one
   * @param childRootComponent
   */
  merge(childRootComponent) {
    this.components = this.components.concat(childRootComponent.components);
  }
}

export default Root;
