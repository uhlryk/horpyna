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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _convertToBranches = __webpack_require__(4);

var _bluebird = __webpack_require__(5);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Branch = function () {
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

        _classCallCheck(this, Branch);

        if (!name) {
            throw TypeError("Name should be provided");
        }
        this.name = name;
        this.condition = condition;
        this.action = action;
        this.branches = (0, _convertToBranches.convertToBranches)(branches);
    }

    _createClass(Branch, [{
        key: "changeCondition",
        value: function changeCondition(newCondition) {
            this.condition = newCondition;
            return this;
        }
    }, {
        key: "setAction",
        value: function setAction(newAction) {
            this.action = newAction;
            return this;
        }
    }, {
        key: "addBranch",
        value: function addBranch(branch) {
            this.branches.push((0, _convertToBranches.convertToBranch)(branch));
            return this;
        }
    }, {
        key: "getBranch",
        value: function getBranch(name) {
            return this.branches.find(function (branch) {
                return branch.getName() === name;
            }) || null;
        }
    }, {
        key: "findBranch",
        value: function findBranch(searchName) {
            var _this = this;

            return this.getBranch(searchName) || Object.keys(this.branches).reduce(function (foundBranch, branchName) {
                return foundBranch || _this.branches[branchName].findBranch(searchName);
            }, null);
        }
    }, {
        key: "getAction",
        value: function getAction() {
            return this.action;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "execute",
        value: function execute(value) {
            if (this.condition(value)) {
                var actionResult = this.action(value);
                return _bluebird2.default.reduce(this.branches, function (result, branch) {
                    return result !== null ? _bluebird2.default.resolve(result) : branch.execute(actionResult);
                }, null).then(function (childBranchResult) {
                    return childBranchResult || actionResult;
                });
            }
            return _bluebird2.default.resolve(null);
        }
    }]);

    return Branch;
}();

exports.default = Branch;

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

var _Branch = __webpack_require__(0);

var _Branch2 = _interopRequireDefault(_Branch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Branch: _Branch2.default
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertToBranches = convertToBranches;
exports.convertToBranch = convertToBranch;

var _Branch = __webpack_require__(0);

var _Branch2 = _interopRequireDefault(_Branch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertToBranches(branches) {
    return branches.map(convertToBranch);
}
function convertToBranch(branch) {
    if (branch instanceof _Branch2.default) {
        return branch;
    } else {
        return new _Branch2.default(branch);
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map