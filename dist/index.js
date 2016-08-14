require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
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

	var _channel = __webpack_require__(5);

	var _channel2 = _interopRequireDefault(_channel);

	var _inputChannel = __webpack_require__(4);

	var _inputChannel2 = _interopRequireDefault(_inputChannel);

	var _outputChannel = __webpack_require__(6);

	var _outputChannel2 = _interopRequireDefault(_outputChannel);

	var _channelManager = __webpack_require__(3);

	var _channelManager2 = _interopRequireDefault(_channelManager);

	var _request = __webpack_require__(9);

	var _request2 = _interopRequireDefault(_request);

	var _response = __webpack_require__(7);

	var _response2 = _interopRequireDefault(_response);

	var _channels = __webpack_require__(8);

	var CHANNEL = _interopRequireWildcard(_channels);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    Component: _component2.default,
	    Channel: _channel2.default,
	    InputChannel: _inputChannel2.default,
	    OutputChannel: _outputChannel2.default,
	    ChannelManager: _channelManager2.default,
	    Request: _request2.default,
	    Response: _response2.default,
	    CHANNEL: CHANNEL
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channelManager = __webpack_require__(3);

	var _channelManager2 = _interopRequireDefault(_channelManager);

	var _inputChannel = __webpack_require__(4);

	var _inputChannel2 = _interopRequireDefault(_inputChannel);

	var _outputChannel = __webpack_require__(6);

	var _outputChannel2 = _interopRequireDefault(_outputChannel);

	var _response = __webpack_require__(7);

	var _response2 = _interopRequireDefault(_response);

	var _request = __webpack_require__(9);

	var _request2 = _interopRequireDefault(_request);

	var _channels = __webpack_require__(8);

	var CHANNEL = _interopRequireWildcard(_channels);

	var _errors = __webpack_require__(10);

	var ERROR = _interopRequireWildcard(_errors);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = function () {
	    function Component(options) {
	        _classCallCheck(this, Component);

	        this._inputChannelManager = new _channelManager2.default();
	        this._outputChannelManager = new _channelManager2.default();
	        this._callbackChannelManager = new _channelManager2.default();
	        this.createInputChannel(CHANNEL.DEFAULT_CHANNEL);
	        this.createOutputChannel(CHANNEL.DEFAULT_CHANNEL);
	        this.onInit(options);
	    }

	    _createClass(Component, [{
	        key: "onInit",
	        value: function onInit(options) {}
	    }, {
	        key: "onNext",
	        value: function onNext(request, response) {
	            response.send();
	        }
	    }, {
	        key: "start",
	        value: function start(value) {
	            var targetChannelName = arguments.length <= 1 || arguments[1] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[1];

	            return this.next(new _request2.default(value, null, this.getInputChannel(targetChannelName)));
	        }
	    }, {
	        key: "next",
	        value: function next(request) {
	            var _this = this;

	            var response = new _response2.default(this._getResponseCallback());
	            setTimeout(function () {
	                return _this.onNext(request, response);
	            }, 0);
	            return this;
	        }
	    }, {
	        key: "bind",
	        value: function bind(target) {
	            var targetChannelName = arguments.length <= 1 || arguments[1] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[1];
	            var currentChannelName = arguments.length <= 2 || arguments[2] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[2];

	            var targetInput = target.getInputChannel(targetChannelName);
	            var currentOutput = this.getOutputChannel(currentChannelName);
	            targetInput.addChannel(currentOutput);
	            currentOutput.addChannel(targetInput);
	            return this;
	        }
	    }, {
	        key: "bindCallback",
	        value: function bindCallback(callback) {
	            var currentChannelName = arguments.length <= 1 || arguments[1] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[1];
	            var callbackChannelName = arguments.length <= 2 || arguments[2] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[2];

	            var callbackChannel = new _inputChannel2.default(callbackChannelName, callback);
	            this._callbackChannelManager.addChannel(callbackChannel);
	            var currentOutput = this.getOutputChannel(currentChannelName);
	            currentOutput.addChannel(callbackChannel);
	            return this;
	        }
	    }, {
	        key: "_getResponseCallback",
	        value: function _getResponseCallback() {
	            var _this2 = this;

	            return function (value, channelName) {
	                _this2.getOutputChannel(channelName).emitValue(value);
	            };
	        }
	    }, {
	        key: "isInputChannel",
	        value: function isInputChannel() {
	            var channelName = arguments.length <= 0 || arguments[0] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[0];

	            return this._inputChannelManager.isChannel(channelName);
	        }
	    }, {
	        key: "isOutputChannel",
	        value: function isOutputChannel() {
	            var channelName = arguments.length <= 0 || arguments[0] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[0];

	            return this._outputChannelManager.isChannel(channelName);
	        }
	    }, {
	        key: "getInputChannel",
	        value: function getInputChannel() {
	            var channelName = arguments.length <= 0 || arguments[0] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[0];

	            if (this.isInputChannel(channelName) === false) {
	                throw Error(ERROR.NON_EXIST_CHANNEL);
	            }
	            return this._inputChannelManager.getChannel(channelName);
	        }
	    }, {
	        key: "getOutputChannel",
	        value: function getOutputChannel() {
	            var channelName = arguments.length <= 0 || arguments[0] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[0];

	            if (this.isOutputChannel(channelName) === false) {
	                throw Error(ERROR.NON_EXIST_CHANNEL);
	            }
	            return this._outputChannelManager.getChannel(channelName);
	        }
	    }, {
	        key: "createInputChannel",
	        value: function createInputChannel(channelName) {
	            var _this3 = this;

	            if (this.isInputChannel(channelName) === true) {
	                throw Error(ERROR.UNIQUE_NAME_INPUT_CHANNEL);
	            }
	            var inputSetValueCallback = function inputSetValueCallback(value, parentOutput, currentInput) {
	                _this3.next(new _request2.default(value, parentOutput, currentInput));
	            };
	            this._inputChannelManager.addChannel(new _inputChannel2.default(channelName, inputSetValueCallback));
	            return this;
	        }
	    }, {
	        key: "createOutputChannel",
	        value: function createOutputChannel(channelName) {
	            if (this.isOutputChannel(channelName) === true) {
	                throw Error(ERROR.UNIQUE_NAME_OUTPUT_CHANNEL);
	            }
	            this._outputChannelManager.addChannel(new _outputChannel2.default(channelName));
	            return this;
	        }
	    }]);

	    return Component;
	}();

	exports.default = Component;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChannelManager = function () {
	    function ChannelManager() {
	        _classCallCheck(this, ChannelManager);

	        this._channels = [];
	    }

	    _createClass(ChannelManager, [{
	        key: "isChannel",
	        value: function isChannel(channelName) {
	            return typeof this.getChannel(channelName) !== "undefined";
	        }
	    }, {
	        key: "addChannel",
	        value: function addChannel(channel) {
	            this._channels.push(channel);
	        }
	    }, {
	        key: "getChannel",
	        value: function getChannel(name) {
	            return this._channels.find(function (channel) {
	                return channel.getName() === name;
	            });
	        }
	    }, {
	        key: "getChannels",
	        value: function getChannels() {
	            return this._channels;
	        }
	    }]);

	    return ChannelManager;
	}();

	exports.default = ChannelManager;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channel = __webpack_require__(5);

	var _channel2 = _interopRequireDefault(_channel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InputChannel = function (_Channel) {
	    _inherits(InputChannel, _Channel);

	    function InputChannel(name, onSetValueCallback) {
	        _classCallCheck(this, InputChannel);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InputChannel).call(this, name));

	        _this._onSetValueCallback = onSetValueCallback;
	        return _this;
	    }

	    _createClass(InputChannel, [{
	        key: "setValue",
	        value: function setValue(value, parentOutput) {
	            this._onSetValueCallback(value, parentOutput, this);
	        }
	    }]);

	    return InputChannel;
	}(_channel2.default);

	exports.default = InputChannel;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channelManager = __webpack_require__(3);

	var _channelManager2 = _interopRequireDefault(_channelManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Channel = function (_ChannelManager) {
	    _inherits(Channel, _ChannelManager);

	    function Channel(name) {
	        _classCallCheck(this, Channel);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Channel).call(this));

	        _this._name = name;
	        return _this;
	    }

	    _createClass(Channel, [{
	        key: "getName",
	        value: function getName() {
	            return this._name;
	        }
	    }]);

	    return Channel;
	}(_channelManager2.default);

	exports.default = Channel;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channel = __webpack_require__(5);

	var _channel2 = _interopRequireDefault(_channel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OutputChannel = function (_Channel) {
	    _inherits(OutputChannel, _Channel);

	    function OutputChannel(name) {
	        _classCallCheck(this, OutputChannel);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(OutputChannel).call(this, name));
	    }

	    _createClass(OutputChannel, [{
	        key: "emitValue",
	        value: function emitValue(value) {
	            var _this2 = this;

	            var outputs = this.getChannels();
	            outputs.forEach(function (channel) {
	                channel.setValue(value, _this2);
	            });
	        }
	    }]);

	    return OutputChannel;
	}(_channel2.default);

	exports.default = OutputChannel;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _channels = __webpack_require__(8);

	var CHANNEL = _interopRequireWildcard(_channels);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Response = function () {
	    function Response(onSendCallback) {
	        _classCallCheck(this, Response);

	        this._onSendCallback = onSendCallback;
	    }

	    _createClass(Response, [{
	        key: "send",
	        value: function send() {
	            var value = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
	            var channelName = arguments.length <= 1 || arguments[1] === undefined ? CHANNEL.DEFAULT_CHANNEL : arguments[1];

	            this._onSendCallback(value, channelName);
	            return this;
	        }
	    }]);

	    return Response;
	}();

	exports.default = Response;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DEFAULT_CHANNEL = exports.DEFAULT_CHANNEL = "default";

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Request = function () {
	    function Request(value, source, target) {
	        _classCallCheck(this, Request);

	        this._value = value;
	        this._source = source;
	        this._target = target;
	    }

	    _createClass(Request, [{
	        key: "getValue",
	        value: function getValue() {
	            return this._value;
	        }
	    }, {
	        key: "getTarget",
	        value: function getTarget() {
	            return this._target;
	        }
	    }, {
	        key: "getSource",
	        value: function getSource() {
	            return this._source;
	        }
	    }]);

	    return Request;
	}();

	exports.default = Request;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NON_EXIST_CHANNEL = exports.NON_EXIST_CHANNEL = "channel do not exist";
	var UNIQUE_NAME_CHANNEL = exports.UNIQUE_NAME_CHANNEL = "channel need unique name";
	var UNIQUE_NAME_INPUT_CHANNEL = exports.UNIQUE_NAME_INPUT_CHANNEL = UNIQUE_NAME_CHANNEL;
	var UNIQUE_NAME_OUTPUT_CHANNEL = exports.UNIQUE_NAME_OUTPUT_CHANNEL = UNIQUE_NAME_CHANNEL;

/***/ }
/******/ ]);