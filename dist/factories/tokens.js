'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.useLDOApprove =
  exports.useLDOAllowance =
  exports.useLDODecimals =
  exports.useLDOTotalSupply =
  exports.useLDOBalance =
  exports.useSTETHApprove =
  exports.useSTETHAllowance =
  exports.useSTETHDecimals =
  exports.useSTETHTotalSupply =
  exports.useSTETHBalance =
  exports.useWSTETHApprove =
  exports.useWSTETHAllowance =
  exports.useWSTETHDecimals =
  exports.useWSTETHTotalSupply =
  exports.useWSTETHBalance =
  exports.hooksFactory =
    void 0
var constants_1 = require('@lido-sdk/constants')
var hooks_1 = require('../hooks')
var hooksFactory = function (getTokenAddress) {
  return {
    useTokenBalance: function () {
      var chainId = (0, hooks_1.useSDK)().chainId
      var tokenAddress = getTokenAddress(chainId)
      return (0, hooks_1.useTokenBalance)(tokenAddress)
    },
    useTotalSupply: function () {
      var chainId = (0, hooks_1.useSDK)().chainId
      var tokenAddress = getTokenAddress(chainId)
      return (0, hooks_1.useTotalSupply)(tokenAddress)
    },
    useDecimals: function () {
      var chainId = (0, hooks_1.useSDK)().chainId
      var tokenAddress = getTokenAddress(chainId)
      return (0, hooks_1.useDecimals)(tokenAddress)
    },
    useAllowance: function (spender) {
      var chainId = (0, hooks_1.useSDK)().chainId
      var tokenAddress = getTokenAddress(chainId)
      return (0, hooks_1.useAllowance)(tokenAddress, spender)
    },
    useApprove: function (amount, spender, wrapper) {
      var _a = (0, hooks_1.useSDK)(),
        chainId = _a.chainId,
        account = _a.account
      var tokenAddress = getTokenAddress(chainId)
      return (0, hooks_1.useApprove)(amount, tokenAddress, spender, account, wrapper)
    },
  }
}
exports.hooksFactory = hooksFactory
var wsteth = (0, exports.hooksFactory)(function (chainId) {
  return (0, constants_1.getTokenAddress)(chainId, constants_1.TOKENS.WSTETH)
})
exports.useWSTETHBalance = wsteth.useTokenBalance
exports.useWSTETHTotalSupply = wsteth.useTotalSupply
exports.useWSTETHDecimals = wsteth.useDecimals
exports.useWSTETHAllowance = wsteth.useAllowance
exports.useWSTETHApprove = wsteth.useApprove
var steth = (0, exports.hooksFactory)(function (chainId) {
  return (0, constants_1.getTokenAddress)(chainId, constants_1.TOKENS.STETH)
})
exports.useSTETHBalance = steth.useTokenBalance
exports.useSTETHTotalSupply = steth.useTotalSupply
exports.useSTETHDecimals = steth.useDecimals
exports.useSTETHAllowance = steth.useAllowance
exports.useSTETHApprove = steth.useApprove
var ldo = (0, exports.hooksFactory)(function (chainId) {
  return (0, constants_1.getTokenAddress)(chainId, constants_1.TOKENS.LDO)
})
exports.useLDOBalance = ldo.useTokenBalance
exports.useLDOTotalSupply = ldo.useTotalSupply
exports.useLDODecimals = ldo.useDecimals
exports.useLDOAllowance = ldo.useAllowance
exports.useLDOApprove = ldo.useApprove
