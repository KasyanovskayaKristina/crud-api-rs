import { Server } from "http";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./controller";

export function userRoutes(server: Server) {
  server.on("request", (req, res) => {
    if (req.url === "/api/users" && req.method === "GET") {
      getUsers(req, res);
    } else if (req.url?.startsWith("/api/users/") && req.method === "GET") {
      getUserById(req, res);
    } else if (req.url === "/api/users" && req.method === "POST") {
      createUser(req, res);
    } else if (req.url?.startsWith("/api/users/") && req.method === "PUT") {
      updateUser(req, res);
    } else if (req.url?.startsWith("/api/users/") && req.method === "DELETE") {
      deleteUser(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  });
}
