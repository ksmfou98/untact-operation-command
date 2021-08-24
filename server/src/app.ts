import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import socketio from "socket.io";
import wrtc from "wrtc";

const app = express();
const server = http.createServer(app);

app.use(cors());

let receiverPCs = {};
let senderPCs = {};
let users = {};
let socketToRoom = {};

const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

server.listen(4000, () => {
  console.log("start : http://localhost:4000");
});
