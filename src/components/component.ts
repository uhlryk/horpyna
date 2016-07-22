import Root from "./root";
import ChannelManager from "./channelManager";
import ParentChannelManager from "./parentChannelManager";
import Response from "./response";
import Request from "./request";
import FinalCallback from "./finalCallback";
//import Channel from "./channel";
import * as STATUS from "../constants/statuses";
import * as CHANNEL from "../constants/channels";

class Component {
  _parentChannelManager: ParentChannelManager;
  _channelManager: ChannelManager;
  _status: string;
  _finalComponentFlag: boolean;
  _rootComponent: Root;

  constructor(options) {
    this._parentChannelManager = new ParentChannelManager();
    this._channelManager = new ChannelManager(this);
    this._channelManager.createChannel(CHANNEL.DEFAULT_CHANNEL);
    this._status = STATUS.INIT;
    this._finalComponentFlag = false;
    this._rootComponent = new Root();
    this._rootComponent.addComponent(this);
    this.onInit(options);
  }

  /**
   * for override
   * It is for initialize component
   */
  onInit(options) {}

  onProcess(request, response) {
    response.send(request.value);
  }

  /**
   * should be invoked when structure is build.
   */
  start(value:any, finalCallback: FinalCallback) {
    this._rootComponent.run(finalCallback);
    this._runProcess([value]);
  }

  /**
   * Start to run component logic from this.onProcess.
   */
  _runProcess(parentResponseValueList:any[]) {
    this._status = STATUS.PROCESS;
    setTimeout(() => this.onProcess(new Request(parentResponseValueList), new Response(this)), 0);
  }

  /**
   * When parent component is done, it inform his child components about it. Which allow them to start
   * By default child component start when all parent components are done.
   */
  onParentReady() {
    if (this._parentChannelManager.isDone()) {
      this._runProcess(this._parentChannelManager.getChannelsValue());
    }
  }

  getChannel(channelName) {
    return this._channelManager.getChannel(channelName);
  }

  createChannel(channelName) {
    this._channelManager.createChannel(channelName);
  }

  /**
   * If this method is triggered before component is done, it is flagged as final component,
   * this means that when it is done also component chain is done
   */
  final() {
    this._finalComponentFlag = true;
    return this;
  }

  /**
   * bind parent component with this component
   * @param component parent component
   * @param channelName parent channel name
   */
  bind(parent: Component, channelName: string) {
    channelName = channelName || CHANNEL.DEFAULT_CHANNEL;
    let parentChannel = parent.getChannel(channelName);
    this._parentChannelManager.addChannel(parentChannel);
    parentChannel.addComponent(this);
    parent.setChildRootComponent(this, this._rootComponent);
  }

  setChildRootComponent(child: Component, root: Root) {
    this._rootComponent.merge(root);
    child.setRootComponent(this._rootComponent);
  }

  setRootComponent(root: Root) {
    this._rootComponent = root;
  }

  getStatus() {
    return this._status;
  }
}

export default Component;
