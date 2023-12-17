"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var react_1 = require("react");
var tiny_warning_1 = require("tiny-warning");
var useLocalStorage = function (key, initialValue) {
    var readValue = (0, react_1.useCallback)(function () {
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            (0, tiny_warning_1.default)(typeof window === 'undefined', "Error reading localStorage key \"".concat(key, "\""));
            return initialValue;
        }
    }, [initialValue, key]);
    var _a = (0, react_1.useState)(readValue), storedValue = _a[0], setStoredValue = _a[1];
    var saveToStorage = (0, react_1.useCallback)(function (newValue) {
        try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
            window.dispatchEvent(new Event('local-storage'));
        }
        catch (error) {
            (0, tiny_warning_1.default)(typeof window === 'undefined', "Error setting localStorage key \"".concat(key, "\""));
        }
    }, [key]);
    var setValue = (0, react_1.useCallback)(function (value) {
        if (value instanceof Function) {
            setStoredValue(function (current) {
                var newValue = value(current);
                saveToStorage(newValue);
                return newValue;
            });
        }
        else {
            saveToStorage(value);
            setStoredValue(value);
        }
    }, [saveToStorage]);
    (0, react_1.useEffect)(function () {
        setStoredValue(readValue());
    }, [readValue]);
    (0, react_1.useEffect)(function () {
        var handleStorageChange = function () {
            setStoredValue(readValue());
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-storage', handleStorageChange);
        return function () {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        };
    }, [readValue]);
    return [storedValue, setValue];
};
exports.useLocalStorage = useLocalStorage;
