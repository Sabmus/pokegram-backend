const http = require("http");
const { mongoConnect } = require("./services/mongodb.js");
const { loadData } = require("./services/loadData");

const PORT = process.env.PORT || 8080;

const app = require("./app");

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadData();
  server.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
  });
}

startServer();
