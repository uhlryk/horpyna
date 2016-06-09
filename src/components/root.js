import * as Relation from "../helpers/Relation";
import * as STATUS from "../constants/statuses";
import Promise from "bluebird";

class Root {
  constructor() {
    this.components = [];
    this.status = STATUS.INIT;
  }

  /**
   * root component function, it is triggered by any child component after finish
   */
  onAnyDone() {
    /**
     * if all components are done then finish promise
     *
     * Now chain is finished when component run method finish
     */
    //if(Relation.hasComponentsStatus(this.components, [STATUS.DONE, STATUS.INIT])) {
    //  this.finish();
    //}
  }

  addComponent(component) {
    this.components.push(component);
  }

  /**
   * triggered once from root component. It start all process.
   * It need to have connection ready.
   * @returns Promise promise is resolved when every component in tree is done.
   */
  run(callback) {
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
      this.status = STATUS.PROCESS;
      callback();
    });
    return this.promise;
  }

  finish(output) {
    this.status = STATUS.DONE;
    this.resolve(output);
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
