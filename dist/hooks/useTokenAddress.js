"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenAddress = void 0;
var constants_1 = require("@lynx-sdk/constants");
var useSDK_1 = require("./useSDK");
var useTokenAddress = function (token) {
    var chainId = (0, useSDK_1.useSDK)().chainId;
    return (0, constants_1.getTokenAddress)(chainId, token);
};
exports.useTokenAddress = useTokenAddress;
