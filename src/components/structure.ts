import Map from "./map";
import Component from "./component";
import Channel from "./channel";
import Joint from "./joint";
import ICallbackSetValueCallback from "./iCallbackSetValueCallback";
import CallbackChannel from "./callbackChannel";
import * as CHANNEL from "../constants/channels";

class Structure {
  private _components: Map<Component>;
  private _joints: Map<Joint>;

  constructor() {
    this._components = new Map<Component>();
    this._joints = new Map<Joint>();
  }

  public createComponent(name: string, AnyComponent: typeof Component, options: any = {}): Component {
    const component: Component = new AnyComponent(name, options);
    this._components.add(name, component);
    return component;
  }

  public getComponent(name: string): Component {
    return this._components.get(name);
  }

  public createJoint(name: string, sourceOutput: Channel, targetInput: Channel): Joint {
    const joint = new Joint(name, sourceOutput, targetInput);
    this._joints.add(name , joint);
    return joint;
  }

  public createCallback(name: string, sourceOutput: Channel, callback: ICallbackSetValueCallback): Joint {
    const joint = new Joint(name, sourceOutput, new CallbackChannel(callback));
    this._joints.add(name , joint);
    return joint;
  }

  public getJoint(name: string): Joint {
    return this._joints.get(name);
  }

  public clear(): Structure {
    this._components = new Map<Component>();
    this._joints = new Map<Joint>();
    return this;
  }
}

export default Structure;
