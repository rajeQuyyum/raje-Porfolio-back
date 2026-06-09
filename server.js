import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("send_message", (data) => {
    io.emit("receive_message", {
      ...data,
      _id: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server Running On ${process.env.PORT}`);
});