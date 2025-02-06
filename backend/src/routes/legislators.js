import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Legislators API" });
});

export default router;
