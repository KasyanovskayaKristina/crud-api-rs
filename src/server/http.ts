import http from "http";
import { app } from "../index";

const server = http.createServer(app);

export function startHTTPServer(port: number) {
  server.listen(port, () => {
    console.log(`HTTP server started listening on port ${port}`);
  });
}
