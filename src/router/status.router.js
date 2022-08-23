import express from "express";

const statusRouter = express.Router();

/**
 * @api {get} /status Get server status
 */
statusRouter.get("/", async (req, res) => {
  res.status(200).json({ message: "OK" });
});

export default statusRouter;
