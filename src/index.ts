import { createServer } from "http";
import { startHTTPServer } from "./server/http";
import { userRoutes } from "./users/routes";

export const app = createServer();
userRoutes(app);

startHTTPServer(parseInt(process.env.PORT || "3000"));
