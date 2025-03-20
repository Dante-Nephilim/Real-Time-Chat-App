import { Server } from "socket.io";
import express from "express";
import http from "node:http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL as string,
    credentials: true,
  },
});
const onlineUsers = new Map<string, string>();

export function getReceiverSocketId(userId: string) {
  return onlineUsers.get(userId);
}

io.on("connection", (socket) => {
  console.log("A User is connected", socket.id);
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit("getOnlineUsers", Array.from(onlineUsers));
  }
  socket.on("disconnect", () => {
    console.log("A User is disconnected", socket.id);
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("getOnlineUsers", Array.from(onlineUsers));
    }
  });
});

export { io, app, server };
