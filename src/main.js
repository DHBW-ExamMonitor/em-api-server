const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/kurse", async (req, res) => {
  console.log("get kurse");
  const kurse = await prisma.kurs.findMany();
  res.json(kurse);
});

app.get("/test", async (req, res) => {
  res.send("test");
});

app.get("/student", async (req, res) => {
  const student = await prisma.student.findMany();
  res.json(student);
});

app.post("/kurse", async (req, res) => {
  console.log("posted to kurse");
  res.json({ message: "posted to kurse" });
});

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `🚀 Server ready at: ${
      process.env.HOST ? process.env.HOST : "http://localhost"
    }:${process.env.PORT}`
  )
);
