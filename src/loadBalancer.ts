import cluster from "cluster";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
const PORT = parseInt(process.env.PORT || "4000");
const NUM_WORKERS = parseInt(process.env.NUM_WORKERS || "4");

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork({ PORT: PORT + i + 1 });
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((req, res) => {
    console.log(`Worker ${process.pid} received request`);

    const nextPort =
      PORT +
      (process.env.NODE_APP_INSTANCE
        ? parseInt(process.env.NODE_APP_INSTANCE) + 1
        : 1);
    const options = {
      hostname: "localhost",
      port: nextPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });
  });

  server.listen(PORT + parseInt(process.env.NODE_APP_INSTANCE || "0"), () => {
    console.log(
      `Worker ${process.pid} started listening on port ${PORT + parseInt(process.env.NODE_APP_INSTANCE || "0")}`
    );
  });
}
