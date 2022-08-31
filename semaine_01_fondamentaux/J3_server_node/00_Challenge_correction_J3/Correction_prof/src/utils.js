class Chifoumi {
  constructor({ sheet, rock, chisel, number_players, count }) {
    this.sheet = sheet;
    this.rock = rock;
    this.chisel = chisel;
    this.number_players = number_players;
    this.max = 3; // on garde 3 éléments fixes pour le jeu
    this.count = count;
    // pour les stat du jeu qui a fait quoi les coups identiques
    this.stat = {
      same: 0,
    };
  }

  choice() {
    const elements = [this.sheet, this.rock, this.chisel];

    return elements[Math.floor(Math.random() * this.max)];
  }

  run() {

    // réinitialiser du jeu
    this.stat.same = 0;

    // combien de joueur ? on crée un tableau en fonction du nombre de joueur pour compter les points
    this.stat.players = [];
    for (let i = 0; i < this.number_players; i++) {
      this.stat.players.push(0);
    }

    // on lance la partie, on peut utiliser la syntaxe ES6 très pratique pour l'assignation
    let [choice1, choice2] = [this.choice(), this.choice()];
  
    let count = 0;

    while (count < this.count) {
      if (choice1 === choice2) {
        this.stat.same++;
      }

      // si le premier joueur fait la pierre alors il gagne si l'autre joueur fait un ciseau, sinon le premier joueur perd
      if (choice1 === this.rock) {
        if (choice2 === this.chisel) {
          this.stat.players[0] += 1;
        } else {
          this.stat.players[1] += 1;
        }
      }

      // si le premier joueur fait la feuille alors il gagne si l'autre joueur fait une pierre, sinon le premier joueur perd
      if (choice1 === this.sheet) {
        if (choice2 === this.rock) {
          this.stat.players[0] += 1;
        } else {
          this.stat.players[1] += 1;
        }
      }

      // si le premier joueur fait la ciseau alors il gagne si l'autre joueur fait une feuille, sinon le premier joueur perd
      if (choice1 === this.chisel) {
        if (choice2 === this.sheet) {
          this.stat.players[0] += 1;
        } else {
          this.stat.players[1] += 1;
        }
      }
      // on met à jour les données du jeu on relance
      [choice1, choice2] = [this.choice(), this.choice()];
      count++;
    }
  }

  showResults(){
    this.stat.winner = this.stat.players[0] > this.stat.players[1] ? "j1" : "j2";
    
    console.table(this.stat);
  }
}

exports.Chifoumi = Chifoumi;
