const fs = require("fs");
const readline = require("readline");
// on place la logique de l'algorithmique de l'application dans un dossier spécifique src
const u = require("./src/utils");

// On travaille avec des variables d'environnement
require("dotenv").config();

// les constantes du jeu sont récupérées par décomposition sur l'objet global process
const { APP_SHEET, APP_ROCK, APP_CHISEL, APP_NUMBER_PLAYERS } = process.env;

// On passe les constantes du jeu à la logique algo que l'on a pris soin de mettre dans un fichier à part
// Single Responsability
// pour l'assignation des valeurs on peut utiliser un littéral pour le passage des variables nommées.
const chifoumi = new u.Chifoumi({
  sheet : APP_SHEET,
  rock : APP_ROCK,
  chisel : APP_CHISEL,
  number_players: APP_NUMBER_PLAYERS,
  count: 10,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  `Vous devez taper en ligne de commande start pour lancer le jeu et stop pour tout arrêter`
);

rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
  line = line.trim().toString();

  if (line === "start") {
    
    chifoumi.run();

    chifoumi.showResults();

    console.log("On relance le jeu pour nouvelles statistiques tapez start !");
    rl.prompt();
  }

  if (line == "stop") {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
  }
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0); // arrêt du processus
});
