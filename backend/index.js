require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const http = require("http"); // Import http module
const { Server } = require("socket.io"); // Import Socket.IO
const Message = require("./models/message.model");
const app = express();
const server = http.createServer(app); // Tạo một instance của http.Server từ express
const io = new Server(server, {
  cors: {
    origin: "*", // Điều chỉnh origin theo yêu cầu
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.options("*", cors());

// Routes
app.use("/v1/api", routes);
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Chat backend is running...");
});

// API to fetch messages between two users
app.post("/messages", async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: senderId, receiver_id: receiverId },
        { sender_id: receiverId, receiver_id: senderId },
      ],
    }).sort({ sent_at: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages", details: err });
  }
});

// Socket.IO Handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a specific room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Leave room
  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);
  });

  // Handle sending a message
  socket.on("send_message", async (data) => {
    const { sender_id, receiver_id, content, roomId } = data;

    try {
      const message = new Message({
        sender_id,
        receiver_id,
        content,
      });

      const savedMessage = await message.save();
      // Broadcast tin nhắn tới room
      io.to(roomId).emit("receive_message", savedMessage);
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
