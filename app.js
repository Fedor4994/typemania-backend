import express from "express";
// import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

import authRouter from "./routes/authRoute.js";
import testsRouter from "./routes/testsRoute.js";
import detailsRoute from "./routes/detailsRoute.js";
import gamesRoute from "./routes/gamesRoute.js";

dotenv.config();
const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/tests", testsRouter);
app.use("/api/details", detailsRoute);
app.use("/api/games", gamesRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
