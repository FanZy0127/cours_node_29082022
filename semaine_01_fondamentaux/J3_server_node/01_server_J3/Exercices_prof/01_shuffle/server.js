const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = "8080";

const students = JSON.parse(fs.readFileSync("./students.json")).students;
const { shuffle, htmlContent } = require("./src/utils.js");

const htmlBody = (tbody) => `
  <!DOCTYPE html>
    <head>
      <link rel="stylesheet" href="/style">
    </head>
    <body>
    <table>
      <theader>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Notes</th>
          <th>Average</th>
          <th>Mention</th>
        </tr>
      </theader>
      <tbody>
      ${tbody}
      </tbody>
    </table>
    </body>
  </html>
  `;

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  // favicon route
  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    return res.end();

    // shuffle route
  } else if (url === "shuffle") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlBody(htmlContent(shuffle(students))));

    // style route
  } else if (url === "style") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(fs.readFileSync(__dirname + "/style.css", "utf8"));
    res.end();

    // root route
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlBody(htmlContent(students)));
  }
});

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
