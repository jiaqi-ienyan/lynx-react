'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.useTokenBalance = void 0
var invariant = require('tiny-invariant')
var warning = require('tiny-warning')
var react_1 = require('react')
var contracts_1 = require('@lido-sdk/contracts')
var useContractSWR_1 = require('./useContractSWR')
var useSDK_1 = require('./useSDK')
var useDebounceCallback_1 = require('./useDebounceCallback')
var useTokenBalance = function (token, account, config) {
  var _a = (0, useSDK_1.useSDK)(),
    providerRpc = _a.providerRpc,
    providerWeb3 = _a.providerWeb3,
    sdkAccount = _a.account
  var mergedAccount = account !== null && account !== void 0 ? account : sdkAccount
  invariant(token != null, 'Token is required')
  var contractRpc = (0, contracts_1.getERC20Contract)(token, providerRpc)
  var contractWeb3 = providerWeb3 ? (0, contracts_1.getERC20Contract)(token, providerWeb3) : null
  var result = (0, useContractSWR_1.useContractSWR)({
    shouldFetch: !!mergedAccount,
    contract: contractRpc,
    method: 'balanceOf',
    params: [mergedAccount],
    config: config,
  })
  var updateBalanceDebounced = (0, useDebounceCallback_1.useDebounceCallback)(result.update, 1000)
  ;(0, react_1.useEffect)(
    function () {
      if (!mergedAccount || !providerWeb3 || !contractWeb3) return
      try {
        var fromMe_1 = contractWeb3.filters.Transfer(mergedAccount, null)
        var toMe_1 = contractWeb3.filters.Transfer(null, mergedAccount)
        providerWeb3.on(fromMe_1, updateBalanceDebounced)
        providerWeb3.on(toMe_1, updateBalanceDebounced)
        return function () {
          providerWeb3.off(fromMe_1, updateBalanceDebounced)
          providerWeb3.off(toMe_1, updateBalanceDebounced)
        }
      } catch (error) {
        return warning(false, 'Cannot subscribe to events')
      }
    },
    [providerWeb3, contractWeb3, mergedAccount, updateBalanceDebounced]
  )
  return result
}
exports.useTokenBalance = useTokenBalance
