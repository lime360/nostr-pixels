import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const DATABASE_NAME = process.env.DATABASE_NAME || "pixels";
export const RELAY_URL = process.env.PUBLIC_RELAY_URL || "wss://relay.damus.io";
export const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3000";
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
