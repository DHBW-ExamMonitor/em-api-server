const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/test", async (req, res) => {
  const note = await prisma..update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      body: body,
    },
  });
  res.json({ test: "test" });
});

app.listen(3000, () =>
  console.log("🚀 Server ready at: http://localhost:3000")
);
