const io = require("socket.io-client");
const readline = require("readline");

// 🔥 PUT YOUR REAL RENDER LINK
const SERVER = "https://your-app-name.onrender.com";

// ✅ SUPPORT BOTH TRANSPORTS (IMPORTANT)
const socket = io(SERVER, {
  transports: ["websocket", "polling"]
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\x1b[95m⚡ CYBER TERMINAL CHAT ⚡\x1b[0m");

// connection
socket.on("connect", () => {
  console.log("\x1b[92mConnected to server\x1b[0m");
});

// error debug
socket.on("connect_error", (err) => {
  console.log("❌ Connection error:", err.message);
});

// receive
socket.on("chat message", (msg) => {
  console.log("\x1b[96m" + msg + "\x1b[0m");
});

// send
rl.question("\x1b[93mEnter your name: \x1b[0m", (name) => {
  rl.on("line", (input) => {
    const msg = name + ": " + input;
    console.log("\x1b[90m[YOU] " + msg + "\x1b[0m");
    socket.emit("chat message", msg);
  });
});
