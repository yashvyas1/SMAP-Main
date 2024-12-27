import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { createDatabaseIfNotExist } from "./App/Model/dbQueries.js";
import { client } from "./Config/dbConnection.js";
import { syncModel } from "./App/Model/syncModels.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function initializeDatabase() {
  try {
    await client.connect();
    await createDatabaseIfNotExist(client);
    await client.end();
    await syncModel();
  } catch (error) {}
}

initializeDatabase().then(async () => {
  const authRoutes = (await import("./App/Routes/authRoutes.js")).default;
  app.use('/auth', authRoutes);
  const userRoutes = (await import("./App/Routes/userRoutes.js")).default;
  app.use("/users", userRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
