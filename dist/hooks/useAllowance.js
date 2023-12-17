"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAllowance = void 0;
var tiny_invariant_1 = require("tiny-invariant");
var tiny_warning_1 = require("tiny-warning");
var react_1 = require("react");
var contracts_1 = require("@lynx-sdk/contracts");
var useContractSWR_1 = require("./useContractSWR");
var useSDK_1 = require("./useSDK");
var useDebounceCallback_1 = require("./useDebounceCallback");
var useAllowance = function (token, spender, owner) {
    var _a = (0, useSDK_1.useSDK)(), providerRpc = _a.providerRpc, providerWeb3 = _a.providerWeb3, account = _a.account;
    var mergedOwner = owner !== null && owner !== void 0 ? owner : account;
    (0, tiny_invariant_1.default)(token != null, 'Token is required');
    (0, tiny_invariant_1.default)(spender != null, 'Spender is required');
    var contractRpc = (0, contracts_1.getERC20Contract)(token, providerRpc);
    var contractWeb3 = providerWeb3 ? (0, contracts_1.getERC20Contract)(token, providerWeb3) : null;
    var result = (0, useContractSWR_1.useContractSWR)({
        shouldFetch: !!mergedOwner,
        contract: contractRpc,
        method: 'allowance',
        params: [mergedOwner, spender],
    });
    var updateAllowanceDebounced = (0, useDebounceCallback_1.useDebounceCallback)(result.update, 1000);
    (0, react_1.useEffect)(function () {
        if (!mergedOwner || !providerWeb3 || !contractWeb3)
            return;
        try {
            var transfer_1 = contractWeb3.filters.Transfer(mergedOwner, spender);
            var approve_1 = contractWeb3.filters.Approval(mergedOwner, spender);
            providerWeb3.on(transfer_1, updateAllowanceDebounced);
            providerWeb3.on(approve_1, updateAllowanceDebounced);
            return function () {
                providerWeb3.off(transfer_1, updateAllowanceDebounced);
                providerWeb3.off(approve_1, updateAllowanceDebounced);
            };
        }
        catch (error) {
            return (0, tiny_warning_1.default)(false, 'Cannot subscribe to event');
        }
    }, [contractWeb3, mergedOwner, providerWeb3, updateAllowanceDebounced, spender]);
    return result;
};
exports.useAllowance = useAllowance;
