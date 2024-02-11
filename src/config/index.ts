import dotenv from "dotenv";

dotenv.config();

export const PORT = parseInt(process.env.PORT || "3000");
export const NUM_WORKERS = parseInt(process.env.NUM_WORKERS || "4");
