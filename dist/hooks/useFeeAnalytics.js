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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeeAnalytics = exports.calculatePercentile = void 0;
var constants_1 = require("@ethersproject/constants");
var useFeeHistory_1 = require("./useFeeHistory");
var calculatePercentile = function (array, target) {
    var lessThenTarget = array.reduce(function (counter, current) { return (current.lt(target) ? counter + 1 : counter); }, 0);
    return array.length ? lessThenTarget / array.length : 1;
};
exports.calculatePercentile = calculatePercentile;
var useFeeAnalytics = function (props) {
    var _a;
    var history = (0, useFeeHistory_1.useFeeHistory)(props);
    var data = history.data, mutate = history.mutate, update = history.update;
    var feeHistory = (data === null || data === void 0 ? void 0 : data.baseFeePerGas) || [];
    var baseFee = (_a = feeHistory[feeHistory.length - 1]) !== null && _a !== void 0 ? _a : constants_1.Zero;
    var percentile = (0, exports.calculatePercentile)(__spreadArray([], feeHistory, true), baseFee);
    return {
        data: data,
        percentile: percentile,
        baseFee: baseFee,
        mutate: mutate,
        update: update,
        /*
         * support dependency collection
         * https://swr.vercel.app/advanced/performance#dependency-collection
         */
        get loading() {
            return history.loading;
        },
        get initialLoading() {
            return history.initialLoading;
        },
        get error() {
            return history.error;
        },
    };
};
exports.useFeeAnalytics = useFeeAnalytics;
