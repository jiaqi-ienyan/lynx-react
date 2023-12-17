'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SDKContext = void 0
var jsx_runtime_1 = require('react/jsx-runtime')
var tiny_invariant_1 = require('tiny-invariant')
var providers_1 = require('@ethersproject/providers')
var react_1 = require('react')
exports.SDKContext = (0, react_1.createContext)(null)
exports.SDKContext.displayName = 'LidoSDKContext'
var ProviderSDK = function (props) {
  var children = props.children,
    account = props.account,
    chainId = props.chainId,
    supportedChainIds = props.supportedChainIds,
    providerWeb3 = props.providerWeb3,
    swrConfig = props.swrConfig
  ;(0, tiny_invariant_1.default)(chainId, 'invalid chainId')
  ;(0, tiny_invariant_1.default)(
    supportedChainIds === null || supportedChainIds === void 0 ? void 0 : supportedChainIds.length,
    'Supported chains are required'
  )
  var providerRpc = (0, react_1.useMemo)(
    function () {
      var _a
      return (_a = props.providerRpc) !== null && _a !== void 0
        ? _a
        : (0, providers_1.getDefaultProvider)((0, providers_1.getNetwork)(chainId))
    },
    [props.providerRpc, chainId]
  )
  var providerMainnetRpc = (0, react_1.useMemo)(
    function () {
      var _a
      return (_a = props.providerMainnetRpc) !== null && _a !== void 0
        ? _a
        : (0, providers_1.getDefaultProvider)('mainnet')
    },
    [props.providerMainnetRpc]
  )
  var onError = (0, react_1.useMemo)(
    function () {
      var _a
      return (_a = props.onError) !== null && _a !== void 0 ? _a : console.error
    },
    [props.onError]
  )
  var value = (0, react_1.useMemo)(
    function () {
      return {
        account: account,
        chainId: chainId,
        supportedChainIds: supportedChainIds,
        providerMainnetRpc: providerMainnetRpc,
        providerRpc: providerRpc,
        providerWeb3: providerWeb3,
        swrConfig: swrConfig,
        onError: onError,
      }
    },
    [account, chainId, supportedChainIds, providerMainnetRpc, providerRpc, providerWeb3, swrConfig, onError]
  )
  return (0, jsx_runtime_1.jsx)(exports.SDKContext.Provider, { value: value, children: children })
}
exports.default = (0, react_1.memo)(ProviderSDK)
