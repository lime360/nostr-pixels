import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", {
    layout: "main",
    title: "Nostr Pixels",
  });
});

export default router;
