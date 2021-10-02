import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import http from "http";
import userAuth from "./lib/userAuth";
import routes from "./routes";
import "dotenv/config";
import "./database";
import webRTCSocket from "./socket";

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

app.use("/uploads", express.static("uploads"));

webRTCSocket(server);

server.listen(PORT, () => {
  const dir = "./uploads";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(`✅ server ON ${PORT}`);
});
