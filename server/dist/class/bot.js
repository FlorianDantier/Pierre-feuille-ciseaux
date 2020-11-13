"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Choice;
(function (Choice) {
    Choice[Choice["Pierre"] = 0] = "Pierre";
    Choice[Choice["Feuiile"] = 1] = "Feuiile";
    Choice[Choice["Ciseaux"] = 2] = "Ciseaux";
})(Choice || (Choice = {}));
var Strategy;
(function (Strategy) {
    Strategy[Strategy["Strat1"] = 0] = "Strat1";
    Strategy[Strategy["Strat2"] = 1] = "Strat2";
    Strategy[Strategy["Random"] = 2] = "Random";
})(Strategy || (Strategy = {}));
class Bot {
    constructor(_strategy) {
        this.strategy = Strategy.Random;
    }
    makeChoice() {
        if (this.strategy === Strategy.Strat1) {
            // -----------
        }
        else if (this.strategy === Strategy.Strat2) {
            // -----------
        }
        else if (this.strategy === Strategy.Random) {
            let choice = Number.parseInt((Math.random() * 3).toString());
            console.log('Choice \'s bot :' + choice);
            this.choice = choice;
        }
    }
    getChoice() {
        this.makeChoice();
        return this.choice;
    }
}
exports.default = Bot;
