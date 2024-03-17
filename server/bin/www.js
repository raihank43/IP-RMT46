const app = require("../app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://koneksi-on.web.app/",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log({ status: `User Connected.` });

  // socket.on("userConnected", (data) => {
  //   console.log(data, "<<<< ini keterima diserver");
  // });

  // socket.on("chat message", (msg) => {
  //   console.log("message: " + msg);
  //   io.emit('new message', msg);
  // });
  // socket.on("connectedUser", (data) => {

  //   io.emit("broadcastUser", data);
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

httpServer.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
