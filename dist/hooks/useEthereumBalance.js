"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEthereumBalance = void 0;
var tiny_warning_1 = require("tiny-warning");
var react_1 = require("react");
var useSDK_1 = require("./useSDK");
var useEthereumSWR_1 = require("./useEthereumSWR");
var useDebounceCallback_1 = require("./useDebounceCallback");
var useEthereumBalance = function (account, config) {
    var _a = (0, useSDK_1.useSDK)(), providerWeb3 = _a.providerWeb3, sdkAccount = _a.account;
    var mergedAccount = account !== null && account !== void 0 ? account : sdkAccount;
    var result = (0, useEthereumSWR_1.useEthereumSWR)({
        shouldFetch: !!mergedAccount,
        method: 'getBalance',
        params: [mergedAccount, 'latest'],
        config: config,
    });
    var updateBalanceDebounced = (0, useDebounceCallback_1.useDebounceCallback)(result.update, 1000);
    (0, react_1.useEffect)(function () {
        if (!mergedAccount || !providerWeb3)
            return;
        try {
            providerWeb3.on('block', updateBalanceDebounced);
            return function () {
                providerWeb3.off('block', updateBalanceDebounced);
            };
        }
        catch (error) {
            return (0, tiny_warning_1.default)(false, 'Cannot subscribe to Block event');
        }
    }, [providerWeb3, mergedAccount, updateBalanceDebounced]);
    return result;
};
exports.useEthereumBalance = useEthereumBalance;
