import * as STATUS from "../constants/statuses";
import Component from "./component";

class Root {
  _components: Component[];
  _status: string;
  _finishCallback: Function;

  constructor() {
    this._components = [];
    this._status = STATUS.INIT;
  }

  addComponent(component) {
    this._components.push(component);
  }

  /**
   * triggered once from root component. It start all process.
   * It need to have connection ready.
   */
  run(finishCallback: Function) {
    this._finishCallback = finishCallback;
    this._status = STATUS.PROCESS;
  }

  finish(output) {
    this._status = STATUS.DONE;
    if(this._finishCallback) {
      this._finishCallback(output);
    }
  }

  /**
   * allow to join two rootComponents to one
   * @param childRootComponent
   */
  merge(childRootComponent) {
    this._components = this._components.concat(childRootComponent.components);
  }
}

export default Root;
