import Root from "./root";
import ChannelManager from "./channelManager";
import * as ERROR from "../constants/errors";
import * as STATUS from "../constants/statuses";

const DEFAULT_CHANNEL = "default";

class Component {
  constructor(componentFunction) {
    if(typeof componentFunction === "function") {
      this.componentFunction = componentFunction;
    }
    this.connectedParentChannels = [];

    this.channelManager = new ChannelManager();
    this.channelManager.createChannel(DEFAULT_CHANNEL);
    this.status = STATUS.INIT;
    this.finalComponentFlag = false;
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
      this.channelManager.setStatusProcess();
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
    if (this._isParentChannelsDone()) {
      this._runComponentFunction(this._getParentsOutput());
    }
  }

  _isParentChannelsDone() {
    let doneCount = this.connectedParentChannels.reduce((doneCount, channel) => {
      if(channel.getStatus() === STATUS.DONE) {
        return ++doneCount;
      } else {
        return doneCount;
      }
    }, 0);
    return doneCount === this.connectedParentChannels.length;
  }


  /**
   * gather all parents outputs
   */
  _getParentsOutput() {
    if(this.connectedParentChannels.length === 1) {
      return { input: this.connectedParentChannels[0].output };
    } else {
      return { input: this.connectedParentChannels.map(channel => channel.output) };
    }
  }

  /**
   * Get function to run at the end in componentFunction. It inform other components that this one is ready
   * @returns {Function}
   */
  _getResponseObject() {
    return {
      send: (output, channelName) => {
        channelName = channelName || DEFAULT_CHANNEL;
        let channel = this.getChannel(channelName);
        if(this.rootComponent.status === STATUS.PROCESS) {
          this.status = STATUS.DONE;
          this.channelManager.setStatusDone(channel);
          channel.output = output;
          if(this.finalComponentFlag === false) {
            channel.getComponentList().forEach(component => component._onParentReady());
          } else {
            this.rootComponent.finish(output);
          }
        }
      },
      finish: output => {
        if(this.rootComponent.status === STATUS.PROCESS) {
          this.rootComponent.finish(output);
        }
      }
    };
  }

  getChannel(channelName) {
    return this.channelManager.getChannel(channelName);
  }

  createChannel(channelName) {
    this.channelManager.createChannel(channelName);
  }


  /**
   * If this method is triggered before component is done, it is flagged as final component,
   * this means that when it is done also component chain is done
   */
  final() {
    this.finalComponentFlag = true;
    return this;
  }
  /**
   * bind parent component with this component
   * @param component parent component
   * @param channel parent channel name
   */
  bind(component, channelName) {
    channelName = channelName || DEFAULT_CHANNEL;
    let parentChannel = component.getChannel(channelName);
    this.connectedParentChannels.push(parentChannel);
    parentChannel.addComponent(this);
    component.rootComponent.merge(this.rootComponent);
    this.rootComponent = component.rootComponent;
  }

}
export default Component;
