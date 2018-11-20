define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let startGameListener = function () { };
    let hitListener = function (handIndex) {
        this.playerHit(handIndex);
    };
    let stayListener = function (handIndex) {
        this.game.playerStay(handIndex);
        this.dealerFunctions.DealerTurn();
    };
});
//# sourceMappingURL=ButtonListeners.js.map