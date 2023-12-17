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
exports.useEthereumSWR = void 0;
var tiny_invariant_1 = require("tiny-invariant");
var useLidoSWR_1 = require("./useLidoSWR");
var useSDK_1 = require("./useSDK");
var useEthereumSWR = function (props) {
    var _a;
    var _b = props.shouldFetch, shouldFetch = _b === void 0 ? true : _b, _c = props.params, params = _c === void 0 ? [] : _c, method = props.method, config = props.config;
    var providerRpcFromSdk = (0, useSDK_1.useSDK)().providerRpc;
    var providerRpc = (_a = props.providerRpc) !== null && _a !== void 0 ? _a : providerRpcFromSdk;
    (0, tiny_invariant_1.default)(providerRpc != null, 'RPC Provider is not provided');
    (0, tiny_invariant_1.default)(method != null, 'Method is required');
    return (0, useLidoSWR_1.useLidoSWR)(shouldFetch ? __spreadArray([providerRpc, method], params, true) : null, function (providerRpc, method) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return providerRpc[method].apply(providerRpc, params);
    }, config);
};
exports.useEthereumSWR = useEthereumSWR;
