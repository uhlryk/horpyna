import Root from "./root";
import * as ERROR from "../constants/errors";
import * as STATUS from "../constants/statuses";
import * as Relation from "../helpers/Relation";

class Component {

  constructor(componentFunction) {
    if(typeof componentFunction === "function") {
      this.componentFunction = componentFunction;
    }
    this.connectedChildrenComponents = [];
    this.connectedParentComponents = [];

    this.status = STATUS.INIT;
    this.rootComponent = new Root();
    this.rootComponent.addComponent(this);
  }

  /**
   * triggered once from root component. It start all process.
   * It need to have connection ready.
   * @returns Promise promise is resolved when every component in tree is done.
   */
  run(input) {
    return this.rootComponent.run(() => this._runComponentFunction({ input }));
  }

  /**
   * Start to run component logic from this.componentFunction.
   */
  _runComponentFunction(request) {
    if(typeof this.componentFunction === "function") {
      this.status = STATUS.PROCESS;
      this.componentFunction(request, this._getResponseObject());
    } else {
      throw new Error(ERROR.NO_COMPONENT_FUNCTION);
    }
  }

  /**
   * When parent component is done, it inform his child components about it. Which allow them to start
   * By default child component start when all parent components are done.
   */
  _onParentReady() {
    if (Relation.hasComponentsStatus(this.connectedParentComponents, STATUS.DONE)) {
      this._runComponentFunction(this._getParentsOutput());
    }
  }

  /**
   * gather all parents outputs
   */
  _getParentsOutput() {
    if(this.connectedParentComponents.length === 1) {
      return { input: this.connectedParentComponents[0].output };
    } else {
      return { input: this.connectedParentComponents.map(component => component.output) };
    }
  }

  /**
   * Get function to run at the end in componentFunction. It inform other components that this one is ready
   * @returns {Function}
   */
  _getResponseObject() {
    return {
      send: output => {
        if(this.rootComponent.status === STATUS.PROCESS) {
          this.status = STATUS.DONE;
          this.output = output;
          this.connectedChildrenComponents.forEach(component => component._onParentReady());
          this.rootComponent.onAnyDone();
        }
      },
      finish: output => {
        if(this.rootComponent.status === STATUS.PROCESS) {
          this.status = STATUS.DONE;
          this.output = output;
          this.rootComponent.finish(output);
        }
      }
    };
  }

  /**
   * child component add parent component
   * @param component parent component
   */
  bind(component) {
    this.connectedParentComponents.push(component);
    component._bindChild(this);
  }

  /**
   * Allow parent component to add child component, should be triggered only by this.connect
   * @param component child component
   */
  _bindChild(component) {
    this.connectedChildrenComponents.push(component);
    this.rootComponent.merge(component.rootComponent);
    component.rootComponent = this.rootComponent;
  }

}
export default Component;
