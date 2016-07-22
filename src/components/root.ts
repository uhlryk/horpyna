import * as STATUS from "../constants/statuses";
import Component from "./component";
import FinalCallback from "./finalCallback";

class Root {
  _components: Component[];
  _status: string;
  _finalCallback: FinalCallback;

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
  run(finalCallback: FinalCallback) {
    this._finalCallback = finalCallback;
    this._status = STATUS.PROCESS;
  }

  finish(output) {
    this._status = STATUS.DONE;
    if(this._finalCallback) {
      this._finalCallback(output);
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
