import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

export default app;
