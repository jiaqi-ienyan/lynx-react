"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSDK = void 0;
var react_1 = require("react");
var context_1 = require("../context");
var tiny_invariant_1 = require("tiny-invariant");
var useSDK = function () {
    var contextValue = (0, react_1.useContext)(context_1.SDKContext);
    (0, tiny_invariant_1.default)(contextValue, 'useSDK was used outside of SDKContext');
    return contextValue;
};
exports.useSDK = useSDK;
