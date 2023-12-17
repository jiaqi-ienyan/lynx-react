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
exports.useApprove = void 0;
var invariant = require("tiny-invariant");
var react_1 = require("react");
var contracts_1 = require("@lynx-sdk/contracts");
var useSDK_1 = require("./useSDK");
var useMountedState_1 = require("./useMountedState");
var useAllowance_1 = require("./useAllowance");
var constants_1 = require("@ethersproject/constants");
var defaultWrapper = function (callback) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, callback()];
            case 1:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var useApprove = function (amount, token, spender, owner, wrapper) {
    if (wrapper === void 0) { wrapper = defaultWrapper; }
    var _a = (0, useSDK_1.useSDK)(), providerWeb3 = _a.providerWeb3, account = _a.account, onError = _a.onError;
    var mergedOwner = owner !== null && owner !== void 0 ? owner : account;
    invariant(token != null, 'Token is required');
    invariant(spender != null, 'Spender is required');
    var _b = (0, useMountedState_1.useMountedState)(false), approving = _b[0], setApproving = _b[1];
    var result = (0, useAllowance_1.useAllowance)(token, spender, mergedOwner);
    var _c = result.data, allowance = _c === void 0 ? constants_1.Zero : _c, initialLoading = result.initialLoading, updateAllowance = result.update;
    var needsApprove = !initialLoading && !amount.isZero() && amount.gt(allowance);
    var approve = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var contractWeb3, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invariant(providerWeb3 != null, 'Web3 provider is required');
                    contractWeb3 = (0, contracts_1.getERC20Contract)(token, providerWeb3.getSigner());
                    setApproving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, wrapper(function () { return contractWeb3.approve(spender, amount); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, updateAllowance()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    onError(error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setApproving(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [providerWeb3, token, spender, amount, wrapper, setApproving, updateAllowance, onError]);
    return {
        approve: approve,
        approving: approving,
        needsApprove: needsApprove,
        allowance: allowance,
        initialLoading: initialLoading,
        /*
         * support dependency collection
         * https://swr.vercel.app/advanced/performance#dependency-collection
         */
        get loading() {
            return result.loading;
        },
        get error() {
            return result.error;
        },
    };
};
exports.useApprove = useApprove;
