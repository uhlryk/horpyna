import Root from "./root";
import ChannelManager from "./channelManager";
import ParentChannelManager from "./parentChannelManager";
import Response from "./response";
import * as ERROR from "../constants/errors";
import * as STATUS from "../constants/statuses";
import * as CHANNEL from "../constants/channels";

class Component {

  constructor(options) {
    this.parentChannelManager = new ParentChannelManager();
    this.channelManager = new ChannelManager(this);
    this.channelManager.createChannel(CHANNEL.DEFAULT_CHANNEL);
    this.status = STATUS.INIT;
    this.finalComponentFlag = false;
    this.rootComponent = new Root();
    this.rootComponent.addComponent(this);
    this.onInit(options);
  }

  /**
   * for override
   * It is for initialize component
   */
  onInit(options) {}

  onProcess(request, response) {
    response.send(request.input);
  }

  /**
   * triggered once from root component. It start all process.
   * It need to have connection ready.
   * @returns Promise promise is resolved when every component in tree is done.
   */
  run(input, endCallback) {
    this.rootComponent.run(endCallback);
    this._runProcess({ input });
  }

  /**
   * Start to run component logic from this.onProcess.
   */
  _runProcess(request) {
    this.status = STATUS.PROCESS;
    setTimeout(() => this.onProcess(request, new Response(this)), 0);
  }

  /**
   * When parent component is done, it inform his child components about it. Which allow them to start
   * By default child component start when all parent components are done.
   */
  onParentReady() {
    if (this.parentChannelManager.isDone()) {
      this._runProcess(this.parentChannelManager.getOutput());
    }
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
   * @param channelName parent channel name
   */
  bind(component, channelName) {
    channelName = channelName || CHANNEL.DEFAULT_CHANNEL;
    let parentChannel = component.getChannel(channelName);
    this.parentChannelManager.addChannel(parentChannel);
    parentChannel.addComponent(this);
    component.rootComponent.merge(this.rootComponent);
    this.rootComponent = component.rootComponent;
  }

}

export default Component;
