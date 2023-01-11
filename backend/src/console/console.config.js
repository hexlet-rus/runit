"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createContext = void 0;
var createContext = function (logger, alertLogs) {
    return {
        console: {
            log: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                logger.log.apply(logger, __spreadArray([data], args, false));
            },
            table: function (tabularData) {
                var properties = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    properties[_i - 1] = arguments[_i];
                }
                logger.table.apply(logger, __spreadArray([tabularData], properties, false));
            },
            assert: function (value) {
                var message = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    message[_i - 1] = arguments[_i];
                }
                logger.assert.apply(logger, __spreadArray([value], message, false));
            },
            count: function (label) {
                logger.count(label);
            },
            countReset: function (label) {
                logger.countReset(label);
            },
            debug: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                logger.debug.apply(logger, __spreadArray([data], args, false));
            },
            dir: function (obj, options) {
                logger.dir(obj, options);
            },
            dirxml: function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                logger.dirxml.apply(logger, data);
            },
            info: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                logger.info.apply(logger, __spreadArray([data], args, false));
            },
            error: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                logger.error.apply(logger, __spreadArray([data], args, false));
            },
            group: function () {
                var label = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    label[_i] = arguments[_i];
                }
                logger.group.apply(logger, label);
            },
            groupCollapsed: function () {
                var label = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    label[_i] = arguments[_i];
                }
                logger.groupCollapsed.apply(logger, label);
            },
            groupEnd: function () {
                logger.groupEnd();
            },
            time: function (label) {
                logger.time(label);
            },
            timeEnd: function (label) {
                logger.timeEnd(label);
            },
            timeLog: function (label) {
                logger.timeLog(label);
            },
            trace: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                logger.trace.apply(logger, __spreadArray([message], args, false));
            },
            warn: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                logger.warn.apply(logger, __spreadArray([data], args, false));
            }
        },
        alert: function (value) {
            alertLogs.push(value);
        }
    };
};
exports.createContext = createContext;
