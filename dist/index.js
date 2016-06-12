require("source-map-support").install();
(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _component = __webpack_require__(2);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  Component: _component2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _root = __webpack_require__(3);

	var _root2 = _interopRequireDefault(_root);

	var _channelManager = __webpack_require__(6);

	var _channelManager2 = _interopRequireDefault(_channelManager);

	var _errors = __webpack_require__(8);

	var ERROR = _interopRequireWildcard(_errors);

	var _statuses = __webpack_require__(4);

	var STATUS = _interopRequireWildcard(_statuses);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_CHANNEL = "default";

	var Component = function () {
	  function Component(componentFunction) {
	    _classCallCheck(this, Component);

	    if (typeof componentFunction === "function") {
	      this.componentFunction = componentFunction;
	    }
	    this.connectedParentChannels = [];

	    this.channelManager = new _channelManager2.default();
	    this.channelManager.createChannel(DEFAULT_CHANNEL);
	    this.status = STATUS.INIT;
	    this.finalComponentFlag = false;
	    this.rootComponent = new _root2.default();
	    this.rootComponent.addComponent(this);
	  }

	  /**
	   * triggered once from root component. It start all process.
	   * It need to have connection ready.
	   * @returns Promise promise is resolved when every component in tree is done.
	   */


	  _createClass(Component, [{
	    key: "run",
	    value: function run(input) {
	      var _this = this;

	      return this.rootComponent.run(function () {
	        return _this._runComponentFunction({ input: input });
	      });
	    }

	    /**
	     * Start to run component logic from this.componentFunction.
	     */

	  }, {
	    key: "_runComponentFunction",
	    value: function _runComponentFunction(request) {
	      if (typeof this.componentFunction === "function") {
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

	  }, {
	    key: "_onParentReady",
	    value: function _onParentReady() {
	      if (this._isParentChannelsDone()) {
	        this._runComponentFunction(this._getParentsOutput());
	      }
	    }
	  }, {
	    key: "_isParentChannelsDone",
	    value: function _isParentChannelsDone() {
	      var doneCount = this.connectedParentChannels.reduce(function (doneCount, channel) {
	        if (channel.getStatus() === STATUS.DONE) {
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

	  }, {
	    key: "_getParentsOutput",
	    value: function _getParentsOutput() {
	      if (this.connectedParentChannels.length === 1) {
	        return { input: this.connectedParentChannels[0].output };
	      } else {
	        return { input: this.connectedParentChannels.map(function (channel) {
	            return channel.output;
	          }) };
	      }
	    }

	    /**
	     * Get function to run at the end in componentFunction. It inform other components that this one is ready
	     * @returns {Function}
	     */

	  }, {
	    key: "_getResponseObject",
	    value: function _getResponseObject() {
	      var _this2 = this;

	      return {
	        send: function send(output, channelName) {
	          channelName = channelName || DEFAULT_CHANNEL;
	          var channel = _this2.getChannel(channelName);
	          if (_this2.rootComponent.status === STATUS.PROCESS) {
	            _this2.status = STATUS.DONE;
	            _this2.channelManager.setStatusDone(channel);
	            channel.output = output;
	            if (_this2.finalComponentFlag === false) {
	              channel.getComponentList().forEach(function (component) {
	                return component._onParentReady();
	              });
	            } else {
	              _this2.rootComponent.finish(output);
	            }
	          }
	        }
	      };
	    }
	  }, {
	    key: "getChannel",
	    value: function getChannel(channelName) {
	      return this.channelManager.getChannel(channelName);
	    }
	  }, {
	    key: "createChannel",
	    value: function createChannel(channelName) {
	      this.channelManager.createChannel(channelName);
	    }

	    /**
	     * If this method is triggered before component is done, it is flagged as final component,
	     * this means that when it is done also component chain is done
	     */

	  }, {
	    key: "final",
	    value: function final() {
	      this.finalComponentFlag = true;
	      return this;
	    }
	    /**
	     * bind parent component with this component
	     * @param component parent component
	     * @param channel parent channel name
	     */

	  }, {
	    key: "bind",
	    value: function bind(component, channelName) {
	      channelName = channelName || DEFAULT_CHANNEL;
	      var parentChannel = component.getChannel(channelName);
	      this.connectedParentChannels.push(parentChannel);
	      parentChannel.addComponent(this);
	      component.rootComponent.merge(this.rootComponent);
	      this.rootComponent = component.rootComponent;
	    }
	  }]);

	  return Component;
	}();

	exports.default = Component;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _statuses = __webpack_require__(4);

	var STATUS = _interopRequireWildcard(_statuses);

	var _bluebird = __webpack_require__(5);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Root = function () {
	  function Root() {
	    _classCallCheck(this, Root);

	    this.components = [];
	    this.status = STATUS.INIT;
	  }

	  _createClass(Root, [{
	    key: "addComponent",
	    value: function addComponent(component) {
	      this.components.push(component);
	    }

	    /**
	     * triggered once from root component. It start all process.
	     * It need to have connection ready.
	     * @returns Promise promise is resolved when every component in tree is done.
	     */

	  }, {
	    key: "run",
	    value: function run(callback) {
	      var _this = this;

	      this.promise = new _bluebird2.default(function (resolve) {
	        _this.resolve = resolve;
	        _this.status = STATUS.PROCESS;
	        callback();
	      });
	      return this.promise;
	    }
	  }, {
	    key: "finish",
	    value: function finish(output) {
	      this.status = STATUS.DONE;
	      this.resolve(output);
	    }

	    /**
	     * allow to join two rootComponents to one
	     * @param childRootComponent
	     */

	  }, {
	    key: "merge",
	    value: function merge(childRootComponent) {
	      this.components = this.components.concat(childRootComponent.components);
	    }
	  }]);

	  return Root;
	}();

	exports.default = Root;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var INIT = exports.INIT = "init";
	var PROCESS = exports.PROCESS = "processing";
	var DONE = exports.DONE = "done";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channel = __webpack_require__(7);

	var _channel2 = _interopRequireDefault(_channel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChannelManager = function () {
	  function ChannelManager() {
	    _classCallCheck(this, ChannelManager);

	    this.channels = {};
	  }

	  _createClass(ChannelManager, [{
	    key: "createChannel",
	    value: function createChannel(name) {
	      this.channels[name] = new _channel2.default();
	    }
	  }, {
	    key: "setStatusDone",
	    value: function setStatusDone(doneChannel) {
	      doneChannel.setStatusDone();
	    }
	  }, {
	    key: "getChannel",
	    value: function getChannel(name) {
	      return this.channels[name];
	    }
	  }]);

	  return ChannelManager;
	}();

	exports.default = ChannelManager;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _statuses = __webpack_require__(4);

	var STATUS = _interopRequireWildcard(_statuses);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Channel = function () {
	  function Channel() {
	    _classCallCheck(this, Channel);

	    this._status = STATUS.INIT;
	    this._connectedChildrenComponents = [];
	    this._output = null;
	  }

	  _createClass(Channel, [{
	    key: "addComponent",
	    value: function addComponent(component) {
	      this._connectedChildrenComponents.push(component);
	    }
	  }, {
	    key: "getComponentList",
	    value: function getComponentList() {
	      return this._connectedChildrenComponents;
	    }
	  }, {
	    key: "getStatus",
	    value: function getStatus() {
	      return this._status;
	    }
	  }, {
	    key: "setStatusDone",
	    value: function setStatusDone() {
	      this._status = STATUS.DONE;
	    }
	  }, {
	    key: "output",
	    get: function get() {
	      return this._output;
	    },
	    set: function set(value) {
	      this._output = value;
	    }
	  }]);

	  return Channel;
	}();

	exports.default = Channel;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NO_COMPONENT_FUNCTION = exports.NO_COMPONENT_FUNCTION = "Component doesn't have function logic";

/***/ }
/******/ ])));