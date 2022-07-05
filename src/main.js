const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/kurse", async (req, res) => {
  console.log("get kurse");
  const kurse = await prisma.kurs.findMany();
  res.json(kurse);
});

app.get("/test", async (req, res) => {
  res.send('test');
});

app.get("/student", async (req, res) => {
  const student = await prisma.student.findMany();
  res.json(student);
});

app.post("/kurse", async (req, res) => {
  console.log("posted to kurse");
  res.json({ message: "posted to kurse" });
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${process.env.PORT}`)
);
