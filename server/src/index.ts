import express from "express";
import * as dotenv from "dotenv";
import { dataSource } from "./database/client";
import router from "./router";
const app = express();

dotenv.config();
const { SERVER_PORT } = process.env

app.use('/api', router)

app.listen(SERVER_PORT, async () => {
  await dataSource.initialize();

  console.log(`Example app listening on http://localhost:${SERVER_PORT}`)
});
