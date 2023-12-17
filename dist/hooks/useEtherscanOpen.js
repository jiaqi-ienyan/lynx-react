'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.useEtherscanOpen = void 0
var helpers_1 = require('@lido-sdk/helpers')
var react_1 = require('react')
var useSDK_1 = require('./useSDK')
var useEtherscanOpen = function (hash, entity) {
  var chainId = (0, useSDK_1.useSDK)().chainId
  return (0, react_1.useCallback)(
    function () {
      var link = (0, helpers_1.getEtherscanLink)(chainId, hash, entity)
      ;(0, helpers_1.openWindow)(link)
    },
    [chainId, entity, hash]
  )
}
exports.useEtherscanOpen = useEtherscanOpen
