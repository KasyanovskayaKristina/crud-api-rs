import { IncomingMessage, ServerResponse } from "http";
import * as userService from "./service";

export function getUsers(_req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(userService.getUsers()));
}

export function getUserById(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split("/")[3];
  const user = userService.getUserById(userId || "");
  if (user) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User not found" }));
  }
}

export function createUser(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", (chunk: Buffer) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const { username, age, hobbies } = JSON.parse(body);
    if (!username || !age) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Username and age are required" }));
    } else {
      const newUser = userService.createUser(username, age, hobbies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    }
  });
}

export function updateUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split("/")[3];
  let body = "";
  req.on("data", (chunk: Buffer) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const { username, age, hobbies } = JSON.parse(body);
    const updatedUser = userService.updateUser(
      userId || "",
      username,
      age,
      hobbies
    );
    if (updatedUser) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedUser));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }
  });
}

export function deleteUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split("/")[3];
  userService.deleteUser(userId || "");
  res.writeHead(204);
  res.end();
}
