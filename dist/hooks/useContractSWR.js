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
exports.useContractSWR = void 0;
var invariant = require("tiny-invariant");
var useLidoSWR_1 = require("./useLidoSWR");
var useContractSWR = function (props) {
    var _a = props.shouldFetch, shouldFetch = _a === void 0 ? true : _a, _b = props.params, params = _b === void 0 ? [] : _b, contract = props.contract, method = props.method, config = props.config;
    invariant(contract != null, 'Contract is required');
    invariant(method != null, 'Method is required');
    return (0, useLidoSWR_1.useLidoSWR)(shouldFetch ? __spreadArray([contract, method], params, true) : null, function (contract, method) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return contract[method].apply(contract, params);
    }, config);
};
exports.useContractSWR = useContractSWR;
