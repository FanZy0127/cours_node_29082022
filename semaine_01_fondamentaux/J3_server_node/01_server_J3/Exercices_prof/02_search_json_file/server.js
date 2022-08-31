const fs = require("fs"),
    http = require("http"),
    hostname = "localhost",
    PORT = 8081;
const all = require("./Data/all.json").students;


const getAll = (json) => {
  let content = "";
  for (const user of json) {
    let avg = 0;

    for(const note of user.notes) avg += note;

    avg /= user.notes.length;

    if(avg >= 16) user.mention = "Très bien";
    else if(avg >= 14) user.mention = "Bien";
    else if(avg >= 12) user.mention = "Assez Bien";
    else if(avg >= 10) user.mention = "Passable";
    else user.mention = "Pas de mention";

    content += `
			<tr>
				<td>${user.name}</td>
				<td>${user.address}</td>
				<td>${user.notes.toString().replaceAll(",", " / ")}</td>
				<td>${avg}</td>
				<td>${user.mention}</td>
			</tr>
		`;
  }
  return content;
};

const htmlBody = (tbody) => `
  <!DOCTYPE html>
    <head>
		<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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

const server = http.createServer(function (req, res) {
  const url = req.url.replace("/", "");

  if (url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  } else if (url.substring(0, 6) === "search") {
    try {
      const data = fs.readFileSync("./Data/" + url.substring(7, url.length) + ".json");
      res.writeHead(200);
      res.end(htmlBody(getAll([JSON.parse(data)])));
    } catch(err) {
      res.writeHead(404);
      return res.end(JSON.stringify(err));
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlBody(getAll(all)));
  }
});

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
