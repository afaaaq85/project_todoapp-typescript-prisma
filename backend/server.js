const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const todoServer = require("./services/todoService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const port = process.env.PORT;

app.use("/", todoRoutes);

async function connectPrismaClient() {
  await prisma.$connect();
  console.log("Connected to PostgreSQL");
}

connectPrismaClient()
  .catch((e) => {
    console.error("error while connecting:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
