let count = 0;

console.log(
  "Pour commencer le jeu, choisissez un nombre compris entre 1 à 100."
);

process.stdin.on("data", (chunk) => {
  const number = parseInt(chunk);
  const searchNumber = 69;

  count ++;

  if (isNaN(number) === true) {
    console.log("Ceci n'est pas un nombre... player-no-baka !");
  } else if (number > 100) {
    console.log("Votre nombre est supérieur à 100 ... BAKEMONO-DAAAAA !")
  } else if (number < 1 ) {
    console.log("Qu'est-ce que tu ne comprends dans 'choisissez un nombre compris entre 1 à 100' ? Andouille !")
  }

  if (count > 10) {
    console.log(`Vous avez dépassé les ${count} tentatives.`);
    process.exit(0);
  }

  if (number > searchNumber && number < 100) {
    console.log(`Le nombre est plus petit que ${number}.`);
  } else if (number < searchNumber && number > 0) {
    console.log(`Le nombre est plus grand que ${number}.`);
  } else if (number === searchNumber) {
    console.log(
      `Vous avez gagnez en ${count} tentative, c'était bien le nombre ${searchNumber} !`
    );
    process.exit(0);
  }
});
