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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
    var _ref$nodeFunction = _ref.nodeFunction,
        nodeFunction = _ref$nodeFunction === undefined ? null : _ref$nodeFunction,
        _ref$conditionFunctio = _ref.conditionFunction,
        conditionFunction = _ref$conditionFunctio === undefined ? function () {
        return true;
    } : _ref$conditionFunctio,
        _ref$childNodeList = _ref.childNodeList,
        childNodeList = _ref$childNodeList === undefined ? [] : _ref$childNodeList;

    return function (value) {
        if (conditionFunction(value)) {
            var nodeFunctionResult = nodeFunction ? nodeFunction(value) : value;
            var childNodeResult = getFirstChildNodeResult(childNodeList, nodeFunctionResult);
            return childNodeResult || nodeFunctionResult;
        }
    };
}

function getFirstChildNodeResult(childNodeList, nodeFunctionResult) {
    var result = void 0;
    childNodeList.find(function (childNode) {
        return result = childNode.setValue(nodeFunctionResult);
    });
    return result;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createSetConditionAction;

var _createSetValueAction = __webpack_require__(0);

var _createSetValueAction2 = _interopRequireDefault(_createSetValueAction);

var _createSetChildNodeAction = __webpack_require__(2);

var _createSetChildNodeAction2 = _interopRequireDefault(_createSetChildNodeAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSetConditionAction(_ref) {
    var nodeFunction = _ref.nodeFunction,
        childNodeList = _ref.childNodeList;

    return function (conditionFunction) {
        return {
            setChildNode: (0, _createSetChildNodeAction2.default)({ nodeFunction: nodeFunction, conditionFunction: conditionFunction, childNodeList: childNodeList }),
            setValue: (0, _createSetValueAction2.default)({ nodeFunction: nodeFunction, conditionFunction: conditionFunction, childNodeList: childNodeList })
        };
    };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createSetChildNodeAction;

var _createSetValueAction = __webpack_require__(0);

var _createSetValueAction2 = _interopRequireDefault(_createSetValueAction);

var _createSetConditionAction = __webpack_require__(1);

var _createSetConditionAction2 = _interopRequireDefault(_createSetConditionAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSetChildNodeAction(_ref) {
    var nodeFunction = _ref.nodeFunction,
        conditionFunction = _ref.conditionFunction,
        _ref$childNodeList = _ref.childNodeList,
        childNodeList = _ref$childNodeList === undefined ? [] : _ref$childNodeList;

    return function (childNode) {
        childNodeList = childNodeList.concat(childNode);
        return {
            setCondition: (0, _createSetConditionAction2.default)({ nodeFunction: nodeFunction, childNodeList: childNodeList }),
            setValue: (0, _createSetValueAction2.default)({ nodeFunction: nodeFunction, conditionFunction: conditionFunction, childNodeList: childNodeList })
        };
    };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Horpyna = __webpack_require__(6);

var _Horpyna2 = _interopRequireDefault(_Horpyna);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Horpyna2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createNodeAction = __webpack_require__(7);

var _createNodeAction2 = _interopRequireDefault(_createNodeAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    createNode: (0, _createNodeAction2.default)()
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createNodeAction;

var _createSetValueAction = __webpack_require__(0);

var _createSetValueAction2 = _interopRequireDefault(_createSetValueAction);

var _createSetConditionAction = __webpack_require__(1);

var _createSetConditionAction2 = _interopRequireDefault(_createSetConditionAction);

var _createSetChildNodeAction = __webpack_require__(2);

var _createSetChildNodeAction2 = _interopRequireDefault(_createSetChildNodeAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNodeAction() {
    console.log("Create node");
    return function (nodeFunction) {
        return {
            setValue: (0, _createSetValueAction2.default)({ nodeFunction: nodeFunction }),
            setCondition: (0, _createSetConditionAction2.default)({ nodeFunction: nodeFunction }),
            setChildNode: (0, _createSetChildNodeAction2.default)({ nodeFunction: nodeFunction })
        };
    };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map