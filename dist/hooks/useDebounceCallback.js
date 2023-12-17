"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounceCallback = void 0;
var react_1 = require("react");
var useDebounceCallback = function (callback, timeout) {
    if (timeout === void 0) { timeout = 0; }
    var timer = (0, react_1.useRef)(null);
    var clearTimer = (0, react_1.useCallback)(function () {
        if (timer.current != null) {
            clearTimeout(timer.current);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        return clearTimer;
    }, [clearTimer]);
    return (0, react_1.useCallback)(function () {
        clearTimer();
        timer.current = setTimeout(callback, timeout);
    }, [callback, timeout, clearTimer]);
};
exports.useDebounceCallback = useDebounceCallback;
