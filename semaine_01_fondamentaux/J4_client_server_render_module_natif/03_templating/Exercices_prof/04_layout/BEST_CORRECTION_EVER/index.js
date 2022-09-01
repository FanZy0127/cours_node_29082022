require("dotenv").config();
const http = require("http");
const pug = require("pug");

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// menu data
const menuItems = [
  { path: "/", title: "Home", isActive: false },
  { path: "/about-me", title: "About", isActive: false },
  { path: "/references", title: "References", isActive: false },
  { path: "/contact-me", title: "Contact", isActive: false },
];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  // favicon route
  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    return res.end();

    // other routes
  } else {
    // reset active menu item
    for (const item of menuItems) item.isActive = false;

    // search current menu item
    const item = menuItems.find(({ path }) => path === `/${url}`);

    // update current menu item
    if (item) item.isActive = true;

    // render pug layout
    pug.renderFile("./views/layout.pug", { menu: menuItems, titlePage: item.title }, (err, data) => {
      if (err) return console.log(err.message);

      res.end(data);
    });
  }
});

server.listen(PORT, HOST, () => console.log(`Server running at http://${HOST}:${PORT}/`));
