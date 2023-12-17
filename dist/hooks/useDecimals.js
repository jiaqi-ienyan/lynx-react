"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDecimals = void 0;
var tiny_invariant_1 = require("tiny-invariant");
var contracts_1 = require("@lynx-sdk/contracts");
var useContractSWR_1 = require("./useContractSWR");
var useSDK_1 = require("./useSDK");
var useDecimals = function (token, config) {
    var providerRpc = (0, useSDK_1.useSDK)().providerRpc;
    (0, tiny_invariant_1.default)(token != null, 'Token address is required');
    var contract = (0, contracts_1.getERC20Contract)(token, providerRpc);
    var result = (0, useContractSWR_1.useContractSWR)({ contract: contract, method: 'decimals', config: config });
    return result;
};
exports.useDecimals = useDecimals;
