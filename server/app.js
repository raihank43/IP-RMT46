require("dotenv").config();

const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const port = 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.use(errorHandler);

// app.listen(port, () => {
//   console.log("app running on port 3000");
// });

io.on("connection", (socket) => {
  console.log({ status: `User Connected.` });

  // socket.on("userConnected", (data) => {
  //   console.log(data, "<<<< ini keterima diserver");
  // });

  // socket.on("chat message", (msg) => {
  //   console.log("message: " + msg);
  //   io.emit('new message', msg);
  // });

  socket.on("sendMessage", (data) => {
    // console.log(data, "<<<< ini keterima diserver 1");

    io.emit("broadcastMessage", data);
  });

  socket.on("deleteMessage", (data) => {
    io.emit("broadcastDelete", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(port, () => {
  console.log("app running on port 3000");
});
