import Database from "better-sqlite3";
import { DATABASE_NAME } from "./env.js";

export function init() {
  const db = new Database(`${DATABASE_NAME}.db`, { verbose: console.log });
  db.pragma("journal_mode = WAL");
  db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    edata TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `);
  db.close();
}

export function insertEvent(evt: any) {
  const db = new Database(`${DATABASE_NAME}.db`);
  const stmt = db.prepare("INSERT INTO events (edata) VALUES (?)");
  stmt.run(JSON.stringify(evt));
  db.close();
}
