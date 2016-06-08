import Root from "./root";
import * as STATUS from "../constants/statuses";
import * as Relation from "../helpers/Relation";

class Component {

  constructor(componentFunction) {
    this.componentFunction = typeof componentFunction === "function" ? componentFunction : (input, output) => output();

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
  run() {
    return this.rootComponent.run(() => this.runComponentFunction());
  }

  /**
   * Start to run component logic from this.componentFunction.
   */
  runComponentFunction() {
    this.status = STATUS.PROCESS;
    this.componentFunction(null, this.prepareOutputFunction());
  }

  /**
   * When parent component is done, it inform his child components about it. Which allow them to start
   * By default child component start when all parent components are done.
   */
  onParentReady() {
    if(Relation.hasComponentsStatus(this.connectedParentComponents, STATUS.DONE)) {
      this.status = STATUS.PROCESS;
      this.componentFunction(this.getParentsOutput(), this.prepareOutputFunction());
    }
  }

  /**
   * gather all parents outputs
   */
  getParentsOutput() {
    if(this.connectedParentComponents.length === 1) {
      return this.connectedParentComponents[0].output;
    } else {
      return this.connectedParentComponents.map(component => component.output);
    }
  }

  /**
   * Get function to run at the end in componentFunction. It inform other components that this one is ready
   * @returns {Function}
   */
  prepareOutputFunction() {
    return output => {
      this.status = STATUS.DONE;
      this.output = output;
      this.connectedChildrenComponents.forEach(component => component.onParentReady());
      this.rootComponent.onAnyDone();
    };
  }

  /**
   * child component add parent component
   * @param component parent component
   */
  connect(component) {
    this.connectedParentComponents.push(component);
    component.connectChild(this);
  }

  /**
   * Allow parent component to add child component, should be triggered only by this.connect
   * @param component child component
   */
  connectChild(component) {
    this.connectedChildrenComponents.push(component);
    this.rootComponent.merge(component.rootComponent);
    component.rootComponent = this.rootComponent;
  }

}
export default Component;
