const fs = require("fs");

/** 
1. Lisez le fichier à l'aide de la méthode asynchrone. 

2. Recherchez dans le tableau tous les étudiants qui ont eu une note strictement supérieure à 17.

3. Recherchez dans le tableau l'étudiant qui a eu la meilleur node.

4. Récupérez les données dans l'objet student, puis ajoutez chaque étudiant dans un tableau students.

5. Ordonnez maintenant l'ensemble des données dans le tableau.

-- exercices supplémentaires

6. Ajoutez dans le fichier students.text les étudiants suivants :

7. Récupérez tous les étudiants habitant à Paris et placez les dans un nouveau fichier.

*/

// 1.
// On utilise le tableau de manière globale pour traiter chacune des questions.

fs.readFile("../Data/students.txt", "utf8", (err, data) => {
  // Gestion des erreurs
  if (err) {
    console.error(err);
    return;
  }

  // on gère le retour chariot \r (éventuel) et saut de ligne \n et on écrase le tableau précédent avec les résultats
  const lines = data.split(/\r?\n/);
  // console.log(lines)
});

// 1.bis
// ici le tableau st sera utilisé dans un contexte synchrone, aucun problème pour la suite du script.
// Par contre si c'est asynchrone comme dans la fonction readFile,
// vous devez mettre tout le code dans la fonction de callback.
let st = [];
try {
  st = fs.readFileSync("../Data/students.txt", "utf8").split(/\r?\n/);
  st = st.filter((data) => data != "");
} catch (err) {
  console.error(err);
}

// 2
const more_than_17 = [];
// En utilisant la première fonction nous pouvons utiliser le tableau lines de manière globale
for (line of st) {
  const [note, name, address] = line.split(" ");
  if (note > 17) {
    more_than_17.push(`${name} : ${note}`);
  }
}

console.table(more_than_17);

// 3

let best_note = 0
let best_student = '';

for (line of st) {
  const [note, name, address] = line.split(" ");
    if (isNaN(note) === false && note > best_note) {
      best_note = parseInt(note);
      best_student = name;
    }
}

console.log(`The best note is ${best_note}, owned by ${best_student}`);

// 4
// const student = { name : null, note : null, address : null}; // structure de l'objet
const students = []; // tableau pour récupérer les données.

for (line of st) {
  const [note, name, address] = line.split(" ");
  // on peut également virer la ligne où se trouve les labels avec cette astuce
  if (name === "Name") continue;
  students.push({ name, note, address });
}

console.log(students);

// 5 la fonction sort modifie le tableau initial par référence
students.sort((s1, s2) => s1.note - s2.note);

console.log(students);

// Exercices supplémentaires

// 6. Ajoutez dans le fichier students.txt les étudiants suivants :

const { appendFile, open, writeFile } = fs; // assignation par décomposition

/**
 * 
- 18 Sonia Paris
- 17 Clarisse Marseille
 */

for (const st of ["\n", "17 Clarisse Marseille", "\n", "18 Sonia Paris", "\n", ""])
  appendFile("../Data/students.txt", st, (err) => {
    if (err) throw err;
    // Tous les traitements étant asynchrone penser à les faire au bon moment
    fs.readFile("../Data/students.txt", "utf8", (err, data) => {
      // Gestion des erreurs
      if (err) {
        console.error(err);
        return;
      }
      
      // on gère le retour chariot \r (éventuel) et saut de ligne \n et on écrase le tableau précédent avec les résultats
      // ne pas oublier de supprimer la ligne vide à la fin du fichier modifié
      const lines = data.split(/\r?\n/).filter(d => d != '');
    
      let str = "";
      for (const i in lines) {
        const [note, name, address] = lines[i].split(" ");
        if (name === "Name") {
          str += `${note} ${name} ${address} \n`;
          continue;
        }
        str += `${note} ${name.toUpperCase()} ${address} \n`;
      }
    
      writeFile("../Data/students.txt", str, console.error);
    });
  });