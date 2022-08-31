const http = require("http");
const shuflleUsers = require("./src/utils");

// Constantes et variables
const hostname = "127.0.0.1";
const port = 3000;
const users = ["Alan", "Sophie", "Bernard", "Elie"];

// Server
const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  // pas de favicon pour l'instant
  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end();
    return; // pensez à arrêter l'exécution des scripts côté serveur une fois la réponse envoyée.
  }

  if (url === "") {
    res.setHeader("Content-Type", "text/html;charset=utf8");
    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Shuffle</title>
            </head>
            <body>
                <p><a href="/shuffle">Shuffle</a></p>
            </body>
        </html>
    `);
  }

  if (url === "shuffle") {
    const shuffles = shuflleUsers(users);

    res.setHeader("Content-Type", "text/html;charset=utf8");
    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Shuffle</title>
            </head>
            <body>
                <p><a href="/shuffle">Shuffle</a></p>
                ${shuffles}
            </body>
        </html>
    `);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
