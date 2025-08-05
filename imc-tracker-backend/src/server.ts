import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { AppDataSource } from "./database/data-source";

import app from "./app";
import { PORT } from "./common/constants";

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source initialized");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization:", err);
  });
