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
exports.default = createSetValueAction;
function createSetValueAction(_ref) {
    var _ref$doFunction = _ref.doFunction,
        doFunction = _ref$doFunction === undefined ? null : _ref$doFunction,
        _ref$conditionFunctio = _ref.conditionFunction,
        conditionFunction = _ref$conditionFunctio === undefined ? function () {
        return true;
    } : _ref$conditionFunctio,
        _ref$childBranchList = _ref.childBranchList,
        childBranchList = _ref$childBranchList === undefined ? [] : _ref$childBranchList;

    return function (value) {
        if (conditionFunction(value)) {
            var doFunctionResult = doFunction ? doFunction(value) : value;
            var childBranchResult = getFirstChildBranchResult(childBranchList, doFunctionResult);
            return childBranchResult || doFunctionResult;
        }
    };
}

function getFirstChildBranchResult(childBranchList, doFunctionResult) {
    var result = void 0;
    childBranchList.find(function (childNode) {
        return result = childNode.setValue(doFunctionResult);
    });
    return result;
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

var _createWhenAction = __webpack_require__(5);

var _createWhenAction2 = _interopRequireDefault(_createWhenAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    when: (0, _createWhenAction2.default)()
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createWhenAction;

var _createDoAction = __webpack_require__(6);

var _createDoAction2 = _interopRequireDefault(_createDoAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createWhenAction() {
    return function (conditionFunction) {
        return {
            do: (0, _createDoAction2.default)({ conditionFunction: conditionFunction })
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
exports.default = createDoAction;

var _createSetValueAction = __webpack_require__(0);

var _createSetValueAction2 = _interopRequireDefault(_createSetValueAction);

var _createAddBranchAction = __webpack_require__(7);

var _createAddBranchAction2 = _interopRequireDefault(_createAddBranchAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDoAction(_ref) {
    var conditionFunction = _ref.conditionFunction;

    return function (doFunction) {
        return {
            setValue: (0, _createSetValueAction2.default)({ doFunction: doFunction, conditionFunction: conditionFunction }),
            addBranch: (0, _createAddBranchAction2.default)({ doFunction: doFunction, conditionFunction: conditionFunction })
        };
    };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createAddBranchAction;

var _createSetValueAction = __webpack_require__(0);

var _createSetValueAction2 = _interopRequireDefault(_createSetValueAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAddBranchAction(_ref) {
    var doFunction = _ref.doFunction,
        conditionFunction = _ref.conditionFunction,
        _ref$childBranchList = _ref.childBranchList,
        childBranchList = _ref$childBranchList === undefined ? [] : _ref$childBranchList;

    return function (childBranch) {
        childBranchList = childBranchList.concat(childBranch);
        return {
            addBranch: createAddBranchAction({ doFunction: doFunction, conditionFunction: conditionFunction, childBranchList: childBranchList }),
            setValue: (0, _createSetValueAction2.default)({ doFunction: doFunction, conditionFunction: conditionFunction, childBranchList: childBranchList })
        };
    };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map