import http from "http";
import express from "express";
import cors from "cors";
import "dotenv/config";
import "./database";
import webRTCSocket from "./socket";

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

app.use(cors());
webRTCSocket(server);

server.listen(PORT, () => console.log(`✅ server ON ${PORT}`));
