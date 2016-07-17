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

	var _channelManager = __webpack_require__(5);

	var _channelManager2 = _interopRequireDefault(_channelManager);

	var _parentChannelManager = __webpack_require__(7);

	var _parentChannelManager2 = _interopRequireDefault(_parentChannelManager);

	var _response = __webpack_require__(8);

	var _response2 = _interopRequireDefault(_response);

	var _request = __webpack_require__(10);

	var _request2 = _interopRequireDefault(_request);

	var _errors = __webpack_require__(11);

	var ERROR = _interopRequireWildcard(_errors);

	var _statuses = __webpack_require__(4);

	var STATUS = _interopRequireWildcard(_statuses);

	var _channels = __webpack_require__(9);

	var CHANNEL = _interopRequireWildcard(_channels);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = function () {
	  function Component(options) {
	    _classCallCheck(this, Component);

	    this.parentChannelManager = new _parentChannelManager2.default();
	    this.channelManager = new _channelManager2.default(this);
	    this.channelManager.createChannel(CHANNEL.DEFAULT_CHANNEL);
	    this.status = STATUS.INIT;
	    this.finalComponentFlag = false;
	    this.rootComponent = new _root2.default();
	    this.rootComponent.addComponent(this);
	    this.onInit(options);
	  }

	  /**
	   * for override
	   * It is for initialize component
	   */


	  _createClass(Component, [{
	    key: "onInit",
	    value: function onInit(options) {}
	  }, {
	    key: "onProcess",
	    value: function onProcess(request, response) {
	      response.send(request.value);
	    }

	    /**
	     * triggered once from root component. It start all process.
	     * It need to have connection ready.
	     * @returns Promise promise is resolved when every component in tree is done.
	     */

	  }, {
	    key: "run",
	    value: function run(value, endCallback) {
	      this.rootComponent.run(endCallback);
	      this._runProcess([value]);
	    }

	    /**
	     * Start to run component logic from this.onProcess.
	     */

	  }, {
	    key: "_runProcess",
	    value: function _runProcess(parentResponseValueList) {
	      var _this = this;

	      this.status = STATUS.PROCESS;
	      setTimeout(function () {
	        return _this.onProcess(new _request2.default(parentResponseValueList), new _response2.default(_this));
	      }, 0);
	    }

	    /**
	     * When parent component is done, it inform his child components about it. Which allow them to start
	     * By default child component start when all parent components are done.
	     */

	  }, {
	    key: "onParentReady",
	    value: function onParentReady() {
	      if (this.parentChannelManager.isDone()) {
	        this._runProcess(this.parentChannelManager.getChannelsValue());
	      }
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
	     * @param channelName parent channel name
	     */

	  }, {
	    key: "bind",
	    value: function bind(component, channelName) {
	      channelName = channelName || CHANNEL.DEFAULT_CHANNEL;
	      var parentChannel = component.getChannel(channelName);
	      this.parentChannelManager.addChannel(parentChannel);
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
	     */

	  }, {
	    key: "run",
	    value: function run(endCallback) {
	      this.endCallback = endCallback;
	      this.status = STATUS.PROCESS;
	    }
	  }, {
	    key: "finish",
	    value: function finish(output) {
	      this.status = STATUS.DONE;
	      if (this.endCallback) {
	        this.endCallback(output);
	      }
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channel = __webpack_require__(6);

	var _channel2 = _interopRequireDefault(_channel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChannelManager = function () {
	  function ChannelManager(component) {
	    _classCallCheck(this, ChannelManager);

	    this.component = component;
	    this.channels = [];
	  }

	  _createClass(ChannelManager, [{
	    key: "createChannel",
	    value: function createChannel(name) {
	      this.channels.push(new _channel2.default(this.component, name));
	    }
	  }, {
	    key: "getChannel",
	    value: function getChannel(name) {
	      return this.channels.find(function (channel) {
	        return channel.name === name;
	      });
	    }
	  }]);

	  return ChannelManager;
	}();

	exports.default = ChannelManager;

/***/ },
/* 6 */
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
	  function Channel(component, name) {
	    _classCallCheck(this, Channel);

	    this.component = component;
	    this.name = name;
	    this.status = STATUS.INIT;
	    this.connectedChildrenComponents = [];
	    this.value = null;
	  }

	  _createClass(Channel, [{
	    key: "addComponent",
	    value: function addComponent(component) {
	      this.connectedChildrenComponents.push(component);
	    }
	  }, {
	    key: "getComponentList",
	    value: function getComponentList() {
	      return this.connectedChildrenComponents;
	    }
	  }]);

	  return Channel;
	}();

	exports.default = Channel;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channel = __webpack_require__(6);

	var _channel2 = _interopRequireDefault(_channel);

	var _statuses = __webpack_require__(4);

	var STATUS = _interopRequireWildcard(_statuses);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ParentChannelManager = function () {
	  function ParentChannelManager() {
	    _classCallCheck(this, ParentChannelManager);

	    this.channels = [];
	  }

	  _createClass(ParentChannelManager, [{
	    key: "addChannel",
	    value: function addChannel(channel) {
	      this.channels.push(channel);
	    }
	  }, {
	    key: "getChannelsValue",
	    value: function getChannelsValue() {
	      return this.channels.map(function (channel) {
	        return channel.value;
	      });
	    }
	  }, {
	    key: "isDone",
	    value: function isDone() {
	      var doneCount = this.channels.reduce(function (doneCount, channel) {
	        if (channel.status === STATUS.DONE && channel.component.status === STATUS.DONE) {
	          return ++doneCount;
	        } else {
	          return doneCount;
	        }
	      }, 0);
	      return doneCount === this.channels.length;
	    }
	  }]);

	  return ParentChannelManager;
	}();

	exports.default = ParentChannelManager;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _statuses = __webpack_require__(4);

	var STATUS = _interopRequireWildcard(_statuses);

	var _channels = __webpack_require__(9);

	var CHANNEL = _interopRequireWildcard(_channels);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Object which is passed to component onProcess method.
	 * It allow to set responses to channels of components and then pass it to child components in Request
	 */

	var Response = function () {
	  function Response(component) {
	    _classCallCheck(this, Response);

	    this.component = component;
	  }

	  _createClass(Response, [{
	    key: "init",
	    value: function init() {
	      this.component.channelManager.channels.forEach(function (channel) {
	        channel.status = STATUS.INIT;
	        channel.value = null;
	      });
	    }
	  }, {
	    key: "prepare",
	    value: function prepare(value, channelName) {
	      if (this.component.rootComponent.status === STATUS.PROCESS) {
	        channelName = channelName || CHANNEL.DEFAULT_CHANNEL;
	        var channel = this.component.getChannel(channelName);
	        channel.status = STATUS.DONE;
	        channel.value = value;
	      }
	    }
	  }, {
	    key: "done",
	    value: function done() {
	      var _this = this;

	      if (this.component.rootComponent.status === STATUS.PROCESS) {
	        this.component.status = STATUS.DONE;
	        if (this.component.finalComponentFlag === false) {
	          this.component.channelManager.channels.forEach(function (channel) {
	            if (channel.status === STATUS.DONE) {
	              channel.getComponentList().forEach(function (component) {
	                return component.onParentReady();
	              });
	            }
	          });
	        } else {
	          (function () {
	            var doneChannelList = [];
	            _this.component.channelManager.channels.forEach(function (channel) {
	              if (channel.status === STATUS.DONE) {
	                doneChannelList.push(channel);
	              }
	            });
	            _this.component.rootComponent.finish(doneChannelList);
	          })();
	        }
	      }
	    }
	  }, {
	    key: "send",
	    value: function send(value, channelName) {
	      this.init();
	      this.prepare(value, channelName);
	      this.done();
	    }
	  }]);

	  return Response;
	}();

	exports.default = Response;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DEFAULT_CHANNEL = exports.DEFAULT_CHANNEL = "default";

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Request object which is passed to component onProcess method.
	 * It contains calculated value from parent components channels
	 */

	var Request =
	/**
	 *
	 * @param valueList array from parent components channels which are bind to this component
	 */
	function Request(valueList) {
	  _classCallCheck(this, Request);

	  this.value = valueList;
	};

	exports.default = Request;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ])));