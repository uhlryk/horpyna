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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Horpyna = __webpack_require__(3);

var _Horpyna2 = _interopRequireDefault(_Horpyna);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Horpyna2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Horpyna;

var _response = __webpack_require__(4);

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

    return (0, _response2.default)({ condition: condition, action: action, branches: branches });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = response;

var _createActionCreatorResponse = __webpack_require__(5);

var _createActionCreatorResponse2 = _interopRequireDefault(_createActionCreatorResponse);

var _createSetValue = __webpack_require__(6);

var _createSetValue2 = _interopRequireDefault(_createSetValue);

var _createChangeCondition = __webpack_require__(8);

var _createChangeCondition2 = _interopRequireDefault(_createChangeCondition);

var _createChangeAction = __webpack_require__(9);

var _createChangeAction2 = _interopRequireDefault(_createChangeAction);

var _createAddBranch = __webpack_require__(10);

var _createAddBranch2 = _interopRequireDefault(_createAddBranch);

var _createGetBranch = __webpack_require__(11);

var _createGetBranch2 = _interopRequireDefault(_createGetBranch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function response(options) {
    options = Object.assign({}, options);
    var setValue = (0, _createSetValue2.default)(options);
    var actionCreatorResponse = (0, _createActionCreatorResponse2.default)(response, options);

    setValue.changeCondition = actionCreatorResponse(_createChangeCondition2.default);
    setValue.changeAction = actionCreatorResponse(_createChangeAction2.default);
    setValue.addBranch = actionCreatorResponse(_createAddBranch2.default);
    setValue.getBranch = (0, _createGetBranch2.default)(options);

    return setValue;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createActionCreatorResponse;
function createActionCreatorResponse(response, options) {
    return function (actionCreator) {
        var action = actionCreator(options);
        return function () {
            return response(action.apply(undefined, arguments));
        };
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createSetValue;

var _bluebird = __webpack_require__(7);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSetValue(_ref) {
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

    return function (value) {
        if (condition(value)) {
            var actionResult = action(value);
            return _bluebird2.default.reduce(Object.keys(branches), function (result, branchName) {
                return result !== null ? _bluebird2.default.resolve(result) : branches[branchName](actionResult);
            }, null).then(function (childBranchResult) {
                return childBranchResult || actionResult;
            });
        }
        return _bluebird2.default.resolve(null);
    };
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createChangeCondition;
function createChangeCondition(options) {
    return function (newCondition) {
        return Object.assign({}, options, { condition: newCondition });
    };
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createChangeAction;
function createChangeAction(options) {
    return function (newAction) {
        return Object.assign({}, options, { action: newAction });
    };
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createAddBranch;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAddBranch(options) {
    return function (branchName, branch) {
        return Object.assign({}, options, {
            branches: Object.assign({}, options.branches, _defineProperty({}, branchName, branch))
        });
    };
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createGetBranch;
function createGetBranch(options) {
    return function (branchName) {
        var deepSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var directChildBranch = options.branches[branchName];
        if (directChildBranch) {
            return directChildBranch;
        }
        if (deepSearch) {
            return Object.keys(options.branches).reduce(function (branch, name) {
                return branch || options.branches[name].getBranch(branchName, true);
            }, null);
        }
    };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map