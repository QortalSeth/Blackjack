"use strict";
controller.html.startGameButton.addEventListener('click', function () { });
controller.html.hitButton.addEventListener('click', function () {
    controller.playerHit();
});
controller.html.stayButton.addEventListener('click', function () {
    controller.game.playerStay();
    controller.dealerFunctions.DealerTurn();
});
//# sourceMappingURL=Listeners.js.map