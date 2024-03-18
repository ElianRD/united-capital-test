import express, { json } from "express";
import morgan from "morgan";
import { apiRouter } from "./routes/router.js";

const app = express();
app.use(morgan("dev"));
app.use(json());
app.disable("x-powered-by");

app.use("/api", apiRouter);

export default app;
