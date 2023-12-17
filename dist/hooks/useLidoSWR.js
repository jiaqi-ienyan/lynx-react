"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLidoSWR = void 0;
var react_1 = require("react");
var swr_1 = require("swr");
var useSDK_1 = require("./useSDK");
var LIDO_SWR_DEFAULT_CONFIG = {
    errorRetryInterval: 10000,
    focusThrottleInterval: 10000,
};
var useLidoSWR = function (key, fetcher, config) {
    var swrConfig = (0, useSDK_1.useSDK)().swrConfig;
    var result = (0, swr_1.default)(key, fetcher, __assign(__assign(__assign({}, LIDO_SWR_DEFAULT_CONFIG), swrConfig), config));
    var mutate = result.mutate;
    var update = (0, react_1.useCallback)(function () {
        return mutate(undefined, true);
    }, [mutate]);
    return {
        mutate: mutate,
        update: update,
        /*
         * support dependency collection
         * https://swr.vercel.app/advanced/performance#dependency-collection
         */
        get data() {
            return result.data;
        },
        get loading() {
            return result.isValidating;
        },
        get initialLoading() {
            return result.data == null && result.isValidating;
        },
        get error() {
            return result.error;
        },
    };
};
exports.useLidoSWR = useLidoSWR;
