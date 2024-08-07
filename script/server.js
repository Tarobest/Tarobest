const http = require("http");
const fs = require("fs");
const path = require("path");

const regex = /export\s+default\s+(\{.*\})/;
const server = http.createServer();

server.on("request", (req, res) => {
  console.log();
  if (req.url.indexOf("?") !== -1) {
    const params = req.url.split("?")[1].split("=");
    if (params[1].startsWith("/")) {
      params[1] = params[1].slice(1);
    }
    fs.readFile(
      path.join(process.cwd(), "/src/dev.app.config.ts"),
      (err, data) => {
        const objectString = data.toString().match(regex)[1];
        const devConfig = JSON.parse(objectString);
        const pages = devConfig.pages;
        console.log(params[1], pages.includes(params[1]));
        if (!pages.includes(params[1])) {
          pages.push(params[1]);
        }
        fs.writeFileSync(
          path.join(process.cwd(), "/src/dev.app.config.ts"),
          `export default ${JSON.stringify(devConfig)}`,
        );
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end();
      },
    );
  }
});

server.listen(3132, () => {
  console.log("Server is listening on port 3132");
});
