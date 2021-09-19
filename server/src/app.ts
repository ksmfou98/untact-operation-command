import http from "http";
import express from "express";
import cors from "cors";
import "dotenv/config";
import "./database";
import webRTCSocket from "./socket";
import fs from "fs";
import cookieParser from "cookie-parser";
import userAuth from "./lib/userAuth";
import routes from "./routes";

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// middleware
app.use(userAuth);
app.use("/api/v1", routes);

webRTCSocket(server);

server.listen(PORT, () => {
  const dir = "./uploads";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(`✅ server ON ${PORT}`);
});
