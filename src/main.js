const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/kurse", async (req, res) => {
  const kurse = await prisma.kurs.findMany();
  res.json(kurse);
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${process.env.PORT}`)
);
