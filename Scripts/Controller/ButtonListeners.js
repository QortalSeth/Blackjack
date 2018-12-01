var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "./HTMLElements"], function (require, exports, html) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    function startGameListener() {
    }
    exports.startGameListener = startGameListener;
    function stayListener() {
    }
    exports.stayListener = stayListener;
    exports.splitListener = function () {
    };
    exports.insuranceListener = function () {
    };
    exports.doubleDownListener = function () {
    };
    exports.surrenderListener = function () {
    };
    exports.betTextFieldListener = function () {
        let textField = html.betTextfield;
        let number = parseInt(textField.value);
        if (isNaN(number) || number < 20) {
            html.startGameButton.disabled = true;
        }
        else
            html.startGameButton.disabled = false;
    };
});
//# sourceMappingURL=ButtonListeners.js.map