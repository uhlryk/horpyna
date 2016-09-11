import Map from "./map";
import Component from "./component";
import Joint from "./joint";

class Structure {
  private _components: Map<Component>;
  private _joints: Map<Joint>;

  constructor() {
    this._components = new Map<Component>();
    this._joints = new Map<Joint>();
  }

  public createComponent(name: string, AnyComponent: typeof Component, options: any): Component {
    const component: Component = new AnyComponent(options);
    this._components.add(name, component);
    return component;
  }

  public getComponent(name: string): Component {
    return this._components.get(name);
  }

  public createJoint(name: string, sourceComponentName: string, sourceChannelName: string, targetComponentName: string, targetChannelName: string) {
    const sourceComponent: Component = this._components.get(sourceComponentName);
    const targetComponent: Component = this._components.get(targetComponentName);
    const joint = sourceComponent.createJoint(targetComponent, sourceChannelName, targetChannelName);
    this._joints.add(name , joint);
    return joint;
  }

  public getJoint(name: string): Joint {
    return this._joints.get(name);
  }
}

export default Structure;
