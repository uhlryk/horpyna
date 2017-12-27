(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = response;

var _createSetValue = __webpack_require__(6);

var _createSetValue2 = _interopRequireDefault(_createSetValue);

var _createChangeCondition = __webpack_require__(7);

var _createChangeCondition2 = _interopRequireDefault(_createChangeCondition);

var _createChangeAction = __webpack_require__(8);

var _createChangeAction2 = _interopRequireDefault(_createChangeAction);

var _createSetBranch = __webpack_require__(9);

var _createSetBranch2 = _interopRequireDefault(_createSetBranch);

var _createGetBranch = __webpack_require__(10);

var _createGetBranch2 = _interopRequireDefault(_createGetBranch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function response(options, debug) {
    options = Object.assign({}, options);
    var setValue = (0, _createSetValue2.default)(options, debug);
    setValue.changeCondition = (0, _createChangeCondition2.default)(options, debug);
    setValue.changeAction = (0, _createChangeAction2.default)(options, debug);
    setValue.setBranch = (0, _createSetBranch2.default)(options, debug);
    setValue.getBranch = (0, _createGetBranch2.default)(options, debug);
    return setValue;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Horpyna = __webpack_require__(4);

var _Horpyna2 = _interopRequireDefault(_Horpyna);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Horpyna2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Horpyna;

var _debug = __webpack_require__(5);

var _debug2 = _interopRequireDefault(_debug);

var _response = __webpack_require__(0);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Horpyna(_ref) {
    var _ref$condition = _ref.condition,
        condition = _ref$condition === undefined ? function () {
        return true;
    } : _ref$condition,
        _ref$action = _ref.action,
        action = _ref$action === undefined ? function (value) {
        return value;
    } : _ref$action,
        _ref$branches = _ref.branches,
        branches = _ref$branches === undefined ? {} : _ref$branches;

    var debug = (0, _debug2.default)("Horpyna");
    debug("initialize instance");
    return (0, _response2.default)({ condition: condition, action: action, branches: branches }, debug);
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createSetValue;
function createSetValue(_ref, debug) {
    var _ref$condition = _ref.condition,
        condition = _ref$condition === undefined ? function () {
        return true;
    } : _ref$condition,
        _ref$action = _ref.action,
        action = _ref$action === undefined ? function (value) {
        return value;
    } : _ref$action,
        _ref$branches = _ref.branches,
        branches = _ref$branches === undefined ? {} : _ref$branches;

    debug("create 'setValue' function");
    return function (value) {
        debug("call 'setValue' function");
        if (condition(value)) {
            debug("conditions met");
            var actionResult = action(value);
            var childBranchResult = Object.keys(branches).reduce(function (result, branchName) {
                return result !== undefined ? result : branches[branchName](actionResult);
            }, undefined);
            return childBranchResult || actionResult;
        }
    };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createChangeCondition;

var _response = __webpack_require__(0);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChangeCondition(options, debug) {
    debug("create 'changeCondition' function");
    return function (newCondition) {
        options = Object.assign({}, options, { condition: newCondition });
        debug("call 'changeCondition' function");
        return (0, _response2.default)(options, debug);
    };
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createChangeAction;

var _response = __webpack_require__(0);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChangeAction(options, debug) {
    debug("create 'changeAction' function");
    return function (newAction) {
        options = Object.assign({}, options, { action: newAction });
        debug("call 'changeAction' function");
        return (0, _response2.default)(options, debug);
    };
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createSetBranch;

var _response = __webpack_require__(0);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createSetBranch(options, debug) {
    debug("create 'setBranch' function");
    return function (branchName, branch) {
        debug("call 'setBranch' function with name", branchName);
        options = Object.assign({}, options, {
            branches: Object.assign({}, options.branches, _defineProperty({}, branchName, branch))
        });
        return (0, _response2.default)(options, debug);
    };
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createGetBranch;
function createGetBranch(options, debug) {
    debug("create 'getBranch' function");
    return function (branchName) {
        var deepSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        debug("call 'getBranch' function with name", branchName);
        var directChildBranch = options.branches[branchName];
        if (directChildBranch) {
            return directChildBranch;
        }
        if (deepSearch) {
            return Object.keys(options.branches).reduce(function (branch, name) {
                return branch || options.branches[name].getBranch(branchName, true);
            }, undefined);
        }
    };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map