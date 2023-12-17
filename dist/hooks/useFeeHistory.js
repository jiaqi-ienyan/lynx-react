"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeeHistory = exports.getFeeHistory = exports.trimHistory = exports.combineHistory = exports.getChunksArguments = exports.getBlockNumber = exports.historyCache = void 0;
var warning = require("tiny-warning");
var invariant = require("tiny-invariant");
var react_1 = require("react");
var bignumber_1 = require("@ethersproject/bignumber");
var bytes_1 = require("@ethersproject/bytes");
var useSDK_1 = require("./useSDK");
var useLidoSWR_1 = require("./useLidoSWR");
var useDebounceCallback_1 = require("./useDebounceCallback");
var MAX_BLOCKS_PER_REQUEST = 1024;
var DEFAULT_HISTORY_BLOCKS = MAX_BLOCKS_PER_REQUEST;
var DEFAULT_CACHE_DATA = Object.freeze({
    oldestBlock: -1,
    baseFeePerGas: Object.freeze([]),
    gasUsedRatio: Object.freeze([]),
});
exports.historyCache = new Map();
var getBlockNumber = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
    var cachedNumber, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cachedNumber = provider.blockNumber;
                if (!(cachedNumber === -1)) return [3 /*break*/, 2];
                return [4 /*yield*/, provider.getBlockNumber()];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = cachedNumber;
                _b.label = 3;
            case 3: return [2 /*return*/, _a];
        }
    });
}); };
exports.getBlockNumber = getBlockNumber;
var getChunksArguments = function (fromBlock, toBlock, chunkSize) {
    if (chunkSize === void 0) { chunkSize = MAX_BLOCKS_PER_REQUEST; }
    invariant(fromBlock <= toBlock, 'fromBlock should be less than or equal to toBlock');
    invariant(chunkSize > 0, 'chunkSize should be greater than 0');
    var totalBlocks = toBlock - fromBlock + 1;
    var totalChunks = Math.ceil(totalBlocks / chunkSize);
    return Array.from({ length: totalChunks }, function (_value, index) {
        var newestBlock = toBlock - chunkSize * index;
        var blocks = Math.min(1 + newestBlock - fromBlock, chunkSize);
        return [blocks, (0, bytes_1.hexValue)(bignumber_1.BigNumber.from(newestBlock)), []];
    }).reverse();
};
exports.getChunksArguments = getChunksArguments;
var combineHistory = function () {
    var histories = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        histories[_i] = arguments[_i];
    }
    histories.forEach(function (currentHistory, index) {
        if (index === 0)
            return;
        var previousHistory = histories[index - 1];
        invariant(currentHistory.oldestBlock === previousHistory.oldestBlock + previousHistory.baseFeePerGas.length - 1, 'Histories cannot be merged');
    }, []);
    var lastHistory = histories[histories.length - 1];
    var lastHistoryFees = lastHistory.baseFeePerGas;
    var lastFeePerGas = lastHistoryFees[lastHistoryFees.length - 1];
    var oldestBlock = histories[0].oldestBlock;
    var baseFeePerGas = histories.flatMap(function (_a) {
        var baseFeePerGas = _a.baseFeePerGas;
        return baseFeePerGas.slice(0, -1);
    }).concat(lastFeePerGas);
    var gasUsedRatio = histories.flatMap(function (_a) {
        var gasUsedRatio = _a.gasUsedRatio;
        return gasUsedRatio;
    });
    return {
        oldestBlock: oldestBlock,
        baseFeePerGas: baseFeePerGas,
        gasUsedRatio: gasUsedRatio,
    };
};
exports.combineHistory = combineHistory;
var trimHistory = function (history, blocks) {
    invariant(blocks > 0, 'blocks number should be greater than 0');
    var currentBlocks = history.gasUsedRatio.length;
    var trimmedBlocks = Math.max(0, currentBlocks - blocks);
    var oldestBlock = history.oldestBlock + trimmedBlocks;
    var baseFeePerGas = history.baseFeePerGas.slice(-(blocks + 1));
    var gasUsedRatio = history.gasUsedRatio.slice(-blocks);
    return {
        oldestBlock: oldestBlock,
        baseFeePerGas: baseFeePerGas,
        gasUsedRatio: gasUsedRatio,
    };
};
exports.trimHistory = trimHistory;
var getFeeHistory = function (provider, fromBlock, toBlock, chunkSize) { return __awaiter(void 0, void 0, void 0, function () {
    var chunksArgs, histories, convertedHistories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chunksArgs = (0, exports.getChunksArguments)(fromBlock, toBlock, chunkSize);
                return [4 /*yield*/, Promise.all(chunksArgs.map(function (args) {
                        return provider.send('eth_feeHistory', args);
                    }))];
            case 1:
                histories = _a.sent();
                convertedHistories = histories.map(function (history) { return (__assign(__assign({}, history), { oldestBlock: bignumber_1.BigNumber.from(history.oldestBlock).toNumber(), baseFeePerGas: history.baseFeePerGas.map(function (fee) { return bignumber_1.BigNumber.from(fee); }) })); });
                return [2 /*return*/, exports.combineHistory.apply(void 0, convertedHistories)];
        }
    });
}); };
exports.getFeeHistory = getFeeHistory;
var useFeeHistory = function (props) {
    var _a, _b;
    var _c = props || {}, _d = _c.shouldFetch, shouldFetch = _d === void 0 ? true : _d, _e = _c.blocks, blocks = _e === void 0 ? DEFAULT_HISTORY_BLOCKS : _e, config = _c.config;
    var providerRpcFromSdk = (0, useSDK_1.useSDK)().providerRpc;
    var providerRpc = (_a = props === null || props === void 0 ? void 0 : props.providerRpc) !== null && _a !== void 0 ? _a : providerRpcFromSdk;
    var providerWeb3FromSdk = (0, useSDK_1.useSDK)().providerWeb3;
    var providerWeb3 = (_b = props === null || props === void 0 ? void 0 : props.providerWeb3) !== null && _b !== void 0 ? _b : providerWeb3FromSdk;
    var chainId = (0, useSDK_1.useSDK)().chainId;
    invariant(providerRpc != null, 'RPC Provider is not provided');
    invariant(blocks > 0, 'blocks number should be greater than 0');
    var result = (0, useLidoSWR_1.useLidoSWR)(shouldFetch ? [providerRpc, chainId, blocks] : null, function (providerRpc, chainId, blocks) { return __awaiter(void 0, void 0, void 0, function () {
        var currentBlock, cachedHistory, oldestCachedBlock, blocksInCache, newestCachedBlock, firstRequiredBlock, fromBlock, toBlock, newHistory, shouldCombine, combinedHistory, trimmedHistory;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.getBlockNumber)(providerRpc)];
                case 1:
                    currentBlock = _b.sent();
                    cachedHistory = (_a = exports.historyCache.get(chainId)) !== null && _a !== void 0 ? _a : DEFAULT_CACHE_DATA;
                    oldestCachedBlock = cachedHistory.oldestBlock;
                    blocksInCache = cachedHistory.gasUsedRatio.length;
                    newestCachedBlock = blocksInCache ? oldestCachedBlock + blocksInCache - 1 : -1;
                    firstRequiredBlock = currentBlock - blocks + 1;
                    if (blocksInCache && newestCachedBlock >= currentBlock) {
                        return [2 /*return*/, cachedHistory];
                    }
                    fromBlock = Math.max(newestCachedBlock + 1, firstRequiredBlock);
                    toBlock = currentBlock;
                    return [4 /*yield*/, (0, exports.getFeeHistory)(providerRpc, fromBlock, toBlock)];
                case 2:
                    newHistory = _b.sent();
                    shouldCombine = blocksInCache ? newestCachedBlock < newHistory.oldestBlock : false;
                    combinedHistory = shouldCombine ? (0, exports.combineHistory)(cachedHistory, newHistory) : newHistory;
                    trimmedHistory = (0, exports.trimHistory)(combinedHistory, blocks);
                    exports.historyCache.set(chainId, trimmedHistory);
                    return [2 /*return*/, trimmedHistory];
            }
        });
    }); }, config);
    var updateHistory = (0, useDebounceCallback_1.useDebounceCallback)(result.update);
    var subscribeToUpdates = (0, react_1.useCallback)(function () {
        var provider = providerWeb3 || providerRpc;
        try {
            provider.on('block', updateHistory);
            return function () {
                provider.off('block', updateHistory);
            };
        }
        catch (error) {
            return warning(false, 'Cannot subscribe to Block event');
        }
    }, [providerRpc, providerWeb3, updateHistory]);
    (0, react_1.useEffect)(subscribeToUpdates, [subscribeToUpdates]);
    return result;
};
exports.useFeeHistory = useFeeHistory;
