'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.useWithdrawalQueueContractWeb3 =
  exports.useWithdrawalQueueContractRPC =
  exports.useLDOContractWeb3 =
  exports.useLDOContractRPC =
  exports.useSTETHContractWeb3 =
  exports.useSTETHContractRPC =
  exports.useWSTETHContractWeb3 =
  exports.useWSTETHContractRPC =
  exports.contractHooksFactory =
    void 0
var constants_1 = require('@lido-sdk/constants')
var contracts_1 = require('@lido-sdk/contracts')
var react_1 = require('react')
var hooks_1 = require('../hooks')
var contractHooksFactory = function (factory, getTokenAddress) {
  var getContract = (0, contracts_1.createContractGetter)(factory)
  return {
    useContractRPC: function () {
      var _a = (0, hooks_1.useSDK)(),
        chainId = _a.chainId,
        providerRpc = _a.providerRpc
      var tokenAddress = getTokenAddress(chainId)
      return getContract(tokenAddress, providerRpc)
    },
    useContractWeb3: function () {
      var _a = (0, hooks_1.useSDK)(),
        chainId = _a.chainId,
        providerWeb3 = _a.providerWeb3
      var tokenAddress = getTokenAddress(chainId)
      var signer = (0, react_1.useMemo)(
        function () {
          return providerWeb3 === null || providerWeb3 === void 0 ? void 0 : providerWeb3.getSigner()
        },
        [providerWeb3]
      )
      if (!signer) return null
      return getContract(tokenAddress, signer)
    },
  }
}
exports.contractHooksFactory = contractHooksFactory
var wsteth = (0, exports.contractHooksFactory)(contracts_1.WstethAbiFactory, function (chainId) {
  return (0, constants_1.getTokenAddress)(chainId, constants_1.TOKENS.WSTETH)
})
exports.useWSTETHContractRPC = wsteth.useContractRPC
exports.useWSTETHContractWeb3 = wsteth.useContractWeb3
var steth = (0, exports.contractHooksFactory)(contracts_1.StethAbiFactory, function (chainId) {
  return (0, constants_1.getTokenAddress)(chainId, constants_1.TOKENS.STETH)
})
exports.useSTETHContractRPC = steth.useContractRPC
exports.useSTETHContractWeb3 = steth.useContractWeb3
var ldo = (0, exports.contractHooksFactory)(contracts_1.LdoAbiFactory, function (chainId) {
  return (0, constants_1.getTokenAddress)(chainId, constants_1.TOKENS.LDO)
})
exports.useLDOContractRPC = ldo.useContractRPC
exports.useLDOContractWeb3 = ldo.useContractWeb3
var withdrawalQueue = (0, exports.contractHooksFactory)(contracts_1.WithdrawalQueueAbiFactory, function (chainId) {
  return (0, constants_1.getWithdrawalQueueAddress)(chainId)
})
exports.useWithdrawalQueueContractRPC = withdrawalQueue.useContractRPC
exports.useWithdrawalQueueContractWeb3 = withdrawalQueue.useContractWeb3
