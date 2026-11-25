import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authroute from "./Route/authroutes.js";
import chatroute from "./Route/chatroutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.send("ok"));
app.use("/api/auth", authroute);
app.use("/api/chat", chatroute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    socket.join(String(userId));
  });

  socket.on("sendMessage", ({ receiverId, conversationId }) => {
    io.to(String(receiverId)).emit("receiveMessage", { conversationId });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
}

export default server;