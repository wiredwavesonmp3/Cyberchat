onst express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// ✅ DO NOT FORCE WEBSOCKET
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// simple route (prevents "not found")
app.get("/", (req, res) => {
  res.send("CyberChat server is running ⚡");
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("📩", msg);
    io.emit("chat message", msg); // broadcast
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on " + PORT);
});
