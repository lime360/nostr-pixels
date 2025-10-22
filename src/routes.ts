import { Router, Request, Response } from "express";
import { RELAY_URL } from "./env.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", {
    layout: "main",
    title: "Nostr Pixels",
    relay: RELAY_URL,
  });
});

export default router;
