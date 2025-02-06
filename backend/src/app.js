import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import legislatorsRouter from "./routes/legislators.js";
import billsRouter from "./routes/bills.js";

app.use("/api/legislators", legislatorsRouter);
app.use("/api/bills", billsRouter);

export default app;
