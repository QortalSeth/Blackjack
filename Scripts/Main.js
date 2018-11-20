var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "./Controller/Controller", "./Controller/ButtonListeners"], function (require, exports, Controller_1, listeners) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    listeners = __importStar(listeners);
    let controller = new Controller_1.Controller();
    /*
    To do :
    create list of hit, stay, etc. buttons.
    Add listener to each button type and pass in button index
    
    */
    controller.html.startGameButton.addEventListener('click', listeners.startGameListener);
    controller.html.hitButton.addEventListener('click', listeners.hitListener(0));
    controller.html.stayButton.addEventListener('click', listeners.stayListener(0));
});
/*
To do list:
find image of blackjack table
remake index.html
add money won to controller after game finishes





*/
//# sourceMappingURL=Main.js.map