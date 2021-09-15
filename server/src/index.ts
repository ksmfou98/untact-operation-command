import http from "http";
import express from "express";
import cors from "cors";
import webRTCSocket from "./socket";

const app = express();
const server: http.Server = http.createServer(app);

app.use(cors());
webRTCSocket(server);

server.listen(process.env.PORT || 8080, () => {
  console.log("server running on 8080");
});
