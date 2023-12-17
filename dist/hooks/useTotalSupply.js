"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTotalSupply = void 0;
var invariant = require("tiny-invariant");
var warning = require("tiny-warning");
var react_1 = require("react");
var contracts_1 = require("@lynx-sdk/contracts");
var useContractSWR_1 = require("./useContractSWR");
var useSDK_1 = require("./useSDK");
var useDebounceCallback_1 = require("./useDebounceCallback");
var useTotalSupply = function (token, config) {
    var _a = (0, useSDK_1.useSDK)(), providerRpc = _a.providerRpc, providerWeb3 = _a.providerWeb3;
    invariant(token != null, 'Token is required');
    var contractRpc = (0, contracts_1.getERC20Contract)(token, providerRpc);
    var contractWeb3 = providerWeb3 ? (0, contracts_1.getERC20Contract)(token, providerWeb3) : null;
    var result = (0, useContractSWR_1.useContractSWR)({
        contract: contractRpc,
        method: 'totalSupply',
        config: config,
    });
    var updateSupplyDebounced = (0, useDebounceCallback_1.useDebounceCallback)(result.update, 1000);
    (0, react_1.useEffect)(function () {
        if (!providerWeb3 || !contractWeb3)
            return;
        try {
            var transfer_1 = contractWeb3.filters.Transfer();
            providerWeb3.on(transfer_1, updateSupplyDebounced);
            return function () {
                providerWeb3.off(transfer_1, updateSupplyDebounced);
            };
        }
        catch (error) {
            return warning(false, 'Cannot subscribe to events');
        }
    }, [providerWeb3, contractWeb3, updateSupplyDebounced]);
    return result;
};
exports.useTotalSupply = useTotalSupply;
