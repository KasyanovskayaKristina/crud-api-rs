import cluster from "cluster";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
const PORT = parseInt(process.env.PORT || "4000");

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  const numCPUs = require("os").cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const users: never[] = [];

  const server = http.createServer((req, res) => {
    console.log(`Worker ${process.pid} received request`);

    if (req.url !== "/api/users") {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ code: 404, message: "Request resource doesn't exist" })
      );
      return;
    }

    if (req.url === "/api/users" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
      return;
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  });

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} started listening on port ${PORT}`);
  });
}
