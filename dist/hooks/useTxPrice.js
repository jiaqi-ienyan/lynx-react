"use strict";
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
exports.useTxPrice = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var constants_1 = require("@ethersproject/constants");
var helpers_1 = require("@lynx-sdk/helpers");
var react_1 = require("react");
var useEthereumSWR_1 = require("./useEthereumSWR");
var useEthPrice_1 = require("./useEthPrice");
var getTxPrice = function (gasLimit, ethPrice, gasPrice) {
    if (!gasLimit || ethPrice == null || gasPrice == null) {
        return undefined;
    }
    var txCostInWei = gasPrice.mul(bignumber_1.BigNumber.from(gasLimit));
    var txCostInEth = (0, helpers_1.divide)(txCostInWei, constants_1.WeiPerEther);
    return ethPrice * txCostInEth;
};
var useTxPrice = function (gasLimit) {
    var eth = (0, useEthPrice_1.useEthPrice)();
    var gas = (0, useEthereumSWR_1.useEthereumSWR)({ method: 'getGasPrice' });
    var ethPrice = eth.data;
    var gasPrice = gas.data;
    var data = (0, react_1.useMemo)(function () {
        return getTxPrice(gasLimit, ethPrice, gasPrice);
    }, [gasLimit, ethPrice, gasPrice]);
    var updateEth = eth.update;
    var updateGas = gas.update;
    var update = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, ethPrice, gasPrice;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([updateEth(), updateGas()])];
                case 1:
                    _a = _b.sent(), ethPrice = _a[0], gasPrice = _a[1];
                    return [2 /*return*/, getTxPrice(gasLimit, ethPrice, gasPrice)];
            }
        });
    }); }, [gasLimit, updateEth, updateGas]);
    return {
        update: update,
        data: data,
        /*
         * support dependency collection
         * https://swr.vercel.app/advanced/performance#dependency-collection
         */
        get loading() {
            return eth.loading || gas.loading;
        },
        get initialLoading() {
            return eth.initialLoading || gas.initialLoading;
        },
        get error() {
            return eth.error || gas.error;
        },
    };
};
exports.useTxPrice = useTxPrice;
