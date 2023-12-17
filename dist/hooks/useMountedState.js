"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMountedState = void 0;
var react_1 = require("react");
var useMountedState = function (initialState) {
    var mountedRef = (0, react_1.useRef)(false);
    var _a = (0, react_1.useState)(initialState), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        mountedRef.current = true;
        return function () {
            mountedRef.current = false;
        };
    }, []);
    (0, react_1.useEffect)(function () {
        setState(initialState);
    }, [initialState]);
    var setMountedState = (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!mountedRef.current)
            return;
        setState.apply(void 0, args);
    }, []);
    return [state, setMountedState];
};
exports.useMountedState = useMountedState;
