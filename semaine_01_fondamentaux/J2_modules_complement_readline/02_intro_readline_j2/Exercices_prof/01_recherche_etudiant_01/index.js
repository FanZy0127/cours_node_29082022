const readline = require("readline");
const students = ["Alan", "Sonia", "Sophie", "Roman", "Mélanie", "Arthur", "Jean"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
  if (students.includes(line.trim())) {
    console.log(`Oui c'est trouvé`);
    rl.close();

    return;
  }
  console.log('essayez encore ...');
  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0); // arrêt du processus
});
