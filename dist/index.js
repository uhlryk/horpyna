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

	var _statuses = __webpack_require__(5);

	var STATUS = _interopRequireWildcard(_statuses);

	var _Relation = __webpack_require__(4);

	var Relation = _interopRequireWildcard(_Relation);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = function () {
	  function Component(componentFunction) {
	    _classCallCheck(this, Component);

	    this.componentFunction = typeof componentFunction === "function" ? componentFunction : function (input, output) {
	      return output();
	    };

	    this.connectedChildrenComponents = [];
	    this.connectedParentComponents = [];

	    this.status = STATUS.INIT;
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
	    value: function run() {
	      var _this = this;

	      return this.rootComponent.run(function () {
	        return _this.runComponentFunction();
	      });
	    }

	    /**
	     * Start to run component logic from this.componentFunction.
	     */

	  }, {
	    key: "runComponentFunction",
	    value: function runComponentFunction() {
	      this.status = STATUS.PROCESS;
	      this.componentFunction(null, this.prepareOutputFunction());
	    }

	    /**
	     * When parent component is done, it inform his child components about it. Which allow them to start
	     * By default child component start when all parent components are done.
	     */

	  }, {
	    key: "onParentReady",
	    value: function onParentReady() {
	      if (Relation.hasComponentsStatus(this.connectedParentComponents, STATUS.DONE)) {
	        this.componentFunction(this.getParentsOutput(), this.prepareOutputFunction());
	      }
	    }

	    /**
	     * gather all parents outputs
	     */

	  }, {
	    key: "getParentsOutput",
	    value: function getParentsOutput() {
	      if (this.connectedParentComponents.length === 1) {
	        return this.connectedParentComponents[0].output;
	      } else {
	        return this.connectedParentComponents.map(function (component) {
	          return component.output;
	        });
	      }
	    }

	    /**
	     * Get function to run at the end in componentFunction. It inform other components that this one is ready
	     * @returns {Function}
	     */

	  }, {
	    key: "prepareOutputFunction",
	    value: function prepareOutputFunction() {
	      var _this2 = this;

	      return function (output) {
	        _this2.status = STATUS.DONE;
	        _this2.output = output;
	        _this2.connectedChildrenComponents.forEach(function (component) {
	          return component.onParentReady();
	        });
	        _this2.rootComponent.onAnyDone();
	      };
	    }

	    /**
	     * child component add parent component
	     * @param component parent component
	     */

	  }, {
	    key: "connect",
	    value: function connect(component) {
	      this.connectedParentComponents.push(component);
	      component.connectChild(this);
	    }

	    /**
	     * Allow parent component to add child component, should be triggered only by this.connect
	     * @param component child component
	     */

	  }, {
	    key: "connectChild",
	    value: function connectChild(component) {
	      this.connectedChildrenComponents.push(component);
	      this.rootComponent.merge(component.rootComponent);
	      component.rootComponent = this.rootComponent;
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

	var _Relation = __webpack_require__(4);

	var Relation = _interopRequireWildcard(_Relation);

	var _statuses = __webpack_require__(5);

	var STATUS = _interopRequireWildcard(_statuses);

	var _bluebird = __webpack_require__(6);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Root = function () {
	  function Root() {
	    _classCallCheck(this, Root);

	    this.components = [];
	  }

	  /**
	   * root component function, it is triggered by any child component
	   */


	  _createClass(Root, [{
	    key: "onAnyDone",
	    value: function onAnyDone() {
	      /**
	       * if all components are done then finish promise
	       */
	      if (Relation.hasComponentsStatus(this.components, STATUS.DONE)) {
	        this.finish();
	      }
	    }
	  }, {
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
	        _this.finish = resolve;
	        callback();
	      });
	      return this.promise;
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasComponentsStatus = hasComponentsStatus;

	var _statuses = __webpack_require__(5);

	var STATUS = _interopRequireWildcard(_statuses);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function hasComponentsStatus(components, statuses) {
	  if (statuses.length === undefined) {
	    statuses = [statuses];
	  }
	  var doneCount = components.reduce(function (doneCount, component) {
	    if (statuses.indexOf(component.status) !== -1) {
	      return ++doneCount;
	    } else {
	      return doneCount;
	    }
	  }, 0);
	  return doneCount === components.length;
	} /**
	   * help to calculate relatives components state
	   */

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var INIT = exports.INIT = "init";
	var PROCESS = exports.PROCESS = "processing";
	var DONE = exports.DONE = "done";

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ }
/******/ ])));