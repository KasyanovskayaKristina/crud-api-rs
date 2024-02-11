import cluster from "cluster";
import { NUM_WORKERS, PORT } from "../config";
import { startHTTPServer } from "./http";

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork({ PORT: PORT + i + 1 });
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  startHTTPServer(
    parseInt(process.env.PORT || "3000") +
      parseInt(process.env.NODE_APP_INSTANCE || "0")
  );
}
