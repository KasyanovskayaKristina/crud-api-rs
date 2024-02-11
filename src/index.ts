import http from "http";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000");
const WORKER_ID = parseInt(process.env.NODE_APP_INSTANCE || "0");

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else if (req.url?.startsWith("/api/users/") && req.method === "GET") {
    const userId = req.url.split("/")[3];
    const user = users.find((u) => u.id === userId);
    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }
  } else if (req.url === "/api/users" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || !age) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Username and age are required" }));
      } else {
        const newUser: User = {
          id: uuidv4(),
          username,
          age,
          hobbies: hobbies || [],
        };
        users.push(newUser);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      }
    });
  } else if (req.url?.startsWith("/api/users/") && req.method === "PUT") {
    const userId = req.url.split("/")[3];
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { username, age, hobbies } = JSON.parse(body);
        if (!username || !age) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Username and age are required" }));
        } else {
          if (users[index]?.id !== undefined) {
            const updatedUser: User = {
              id: users[index]!.id,
              username,
              age,
              hobbies: hobbies || [],
            };
            users[index] = updatedUser;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updatedUser));
          } else {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "User id is missing" }));
          }
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }
  } else if (req.url?.startsWith("/api/users/") && req.method === "DELETE") {
    const userId = req.url.split("/")[3];
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT + WORKER_ID, () => {
  console.log(
    `Worker ${WORKER_ID} started listening on port ${PORT + WORKER_ID}`
  );
});
