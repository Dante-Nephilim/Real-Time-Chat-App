import { Server } from "socket.io";
import express from "express";
import http from "node:http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A User is connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A User is disconnected", socket.id);
  });
});

export { io, app, server };
