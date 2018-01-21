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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareOptions;
var IMMUTABLE = false;
function prepareOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var changes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (IMMUTABLE) {
        return Object.assign({}, options, changes);
    } else {
        return Object.assign(options, changes);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = response;

var _createActionCreatorResponse = __webpack_require__(8);

var _createActionCreatorResponse2 = _interopRequireDefault(_createActionCreatorResponse);

var _createSetValue = __webpack_require__(9);

var _createSetValue2 = _interopRequireDefault(_createSetValue);

var _createChangeCondition = __webpack_require__(11);

var _createChangeCondition2 = _interopRequireDefault(_createChangeCondition);

var _createChangeAction = __webpack_require__(12);

var _createChangeAction2 = _interopRequireDefault(_createChangeAction);

var _createAddBranch = __webpack_require__(13);

var _createAddBranch2 = _interopRequireDefault(_createAddBranch);

var _createGetBranch = __webpack_require__(14);

var _createGetBranch2 = _interopRequireDefault(_createGetBranch);

var _createFindBranch = __webpack_require__(15);

var _createFindBranch2 = _interopRequireDefault(_createFindBranch);

var _createGetAction = __webpack_require__(16);

var _createGetAction2 = _interopRequireDefault(_createGetAction);

var _createGetName = __webpack_require__(17);

var _createGetName2 = _interopRequireDefault(_createGetName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function response(options) {
    var setValue = (0, _createSetValue2.default)(options);
    var actionCreatorResponse = (0, _createActionCreatorResponse2.default)(response, options);

    setValue.changeCondition = actionCreatorResponse(_createChangeCondition2.default);
    setValue.changeAction = actionCreatorResponse(_createChangeAction2.default);
    setValue.addBranch = actionCreatorResponse(_createAddBranch2.default);
    setValue.getBranch = (0, _createGetBranch2.default)(options);
    setValue.findBranch = (0, _createFindBranch2.default)(options);
    setValue.getAction = (0, _createGetAction2.default)(options);
    setValue.getName = (0, _createGetName2.default)(options);

    return setValue;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = convertToBranches;

var _response = __webpack_require__(1);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertToBranches(branches) {
    return branches.map(function (branch) {
        if (branch instanceof Function) {
            return branch;
        } else {
            return (0, _response2.default)(branch);
        }
    });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getBranchByName;
function getBranchByName(branches, branchName) {
    return branches.find(function (branch) {
        return branch.getName() === branchName;
    }) || null;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Branch = __webpack_require__(7);

var _Branch2 = _interopRequireDefault(_Branch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Branch: _Branch2.default
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Branch;

var _response = __webpack_require__(1);

var _response2 = _interopRequireDefault(_response);

var _convertToBranches = __webpack_require__(2);

var _convertToBranches2 = _interopRequireDefault(_convertToBranches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Branch() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        _ref$condition = _ref.condition,
        condition = _ref$condition === undefined ? function () {
        return true;
    } : _ref$condition,
        _ref$action = _ref.action,
        action = _ref$action === undefined ? function (value) {
        return value;
    } : _ref$action,
        _ref$branches = _ref.branches,
        branches = _ref$branches === undefined ? [] : _ref$branches;

    if (!name) {
        throw TypeError("Name should be provided");
    }
    return (0, _response2.default)({ name: name, condition: condition, action: action, branches: (0, _convertToBranches2.default)(branches) });
}

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createSetValue;

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSetValue() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$condition = _ref.condition,
        condition = _ref$condition === undefined ? function () {
        return true;
    } : _ref$condition,
        _ref$action = _ref.action,
        action = _ref$action === undefined ? function (value) {
        return value;
    } : _ref$action,
        _ref$branches = _ref.branches,
        branches = _ref$branches === undefined ? [] : _ref$branches;

    return function (value) {
        if (condition(value)) {
            var actionResult = action(value);
            return _bluebird2.default.reduce(branches, function (result, branch) {
                return result !== null ? _bluebird2.default.resolve(result) : branch(actionResult);
            }, null).then(function (childBranchResult) {
                return childBranchResult || actionResult;
            });
        }
        return _bluebird2.default.resolve(null);
    };
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createChangeCondition;

var _changeObject = __webpack_require__(0);

var _changeObject2 = _interopRequireDefault(_changeObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChangeCondition(options) {
    return function (newCondition) {
        return (0, _changeObject2.default)(options, { condition: newCondition });
    };
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createChangeAction;

var _changeObject = __webpack_require__(0);

var _changeObject2 = _interopRequireDefault(_changeObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChangeAction(options) {
    return function (newAction) {
        return (0, _changeObject2.default)(options, { action: newAction });
    };
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createAddBranch;

var _changeObject = __webpack_require__(0);

var _changeObject2 = _interopRequireDefault(_changeObject);

var _convertToBranches = __webpack_require__(2);

var _convertToBranches2 = _interopRequireDefault(_convertToBranches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAddBranch(options) {
    return function (branch) {
        return (0, _changeObject2.default)(options, {
            branches: (0, _convertToBranches2.default)(options.branches.concat(branch))
        });
    };
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createGetBranch;

var _getBranch = __webpack_require__(3);

var _getBranch2 = _interopRequireDefault(_getBranch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGetBranch(options) {
    return function (branchName) {
        return (0, _getBranch2.default)(options.branches, branchName);
    };
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createFindBranch;

var _getBranch = __webpack_require__(3);

var _getBranch2 = _interopRequireDefault(_getBranch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFindBranch(options) {
    return function (branchName) {
        return (0, _getBranch2.default)(options.branches, branchName) || Object.keys(options.branches).reduce(function (branch, name) {
            return branch || options.branches[name].getBranch(branchName);
        }, null);
    };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createGetAction;
function createGetAction(options) {
    return function () {
        return options.action;
    };
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createGetName;
function createGetName(options) {
    return function () {
        return options.name;
    };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map