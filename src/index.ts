import path from "path";
import { fileURLToPath } from "url";
import express, { Express } from "express";
import { engine } from "express-handlebars";
import WebSocket from "ws";
import bodyParser from "body-parser";

import router from "./routes.js";
import { PUBLIC_URL, PORT, RELAY_URL } from "./env.js";
import { init, insertEvent } from "./db.js";

const app: Express = express();
const con = new WebSocket(RELAY_URL);

init();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  }),
);

app.set("view engine", "hbs");
app.set(
  "views",
  path.join(path.dirname(fileURLToPath(import.meta.url)), "../views"),
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${PUBLIC_URL}`);
});

con.onopen = async () => {
  con.send(JSON.stringify(["REQ", "pixels", { kinds: [1, 2763] }]));
};

con.onmessage = async (event) => {
  const message = JSON.parse(event.data as any);
  if (message[0] === "EVENT") {
    const event = message[2];
    if (event.kind === 2763 || event.kind === 1) {
      console.log(event);
      insertEvent(event);
    }
  }
};
