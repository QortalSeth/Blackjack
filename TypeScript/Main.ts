import { Controller } from './Controller/Controller'
import * as dealerFunctions from './Controller/DealerFunctions'
import * as listeners from './Controller/ButtonListeners'

let controller = new Controller()

/*
To do :
create list of hit, stay, etc. buttons.
Add listener to each button type and pass in button index

*/

controller.html.startGameButton.addEventListener('click', listeners.startGameListener)

controller.html.hitButton.addEventListener('click', listeners.hitListener(0))

controller.html.stayButton.addEventListener('click', listeners.stayListener(0))



/*
To do list:
find image of blackjack table
remake index.html
add money won to controller after game finishes





*/
