import React, { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "../api/axiosCustomize";
import { AuthContext } from "../components/context/auth.context";
import { getAllUsersApi } from "../api/api";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState([]);
  const { auth } = useContext(AuthContext);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedMessage]);
  const fetchUsers = async () => {
    try {
      const res = await getAllUsersApi();
      if (res) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      const res = await axios.post("/messages", {
        senderId: auth?.user?.id,
        receiverId: selectedChat?._id,
      });
      setSelectedMessage(res.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchMessage();
  }, [selectedChat]);

  useEffect(() => {
    socket.current = io("http://localhost:8080");

    // Lắng nghe tin nhắn mới
    socket.current.on("receive_message", (data) => {
      if (
        selectedChat &&
        (data.sender_id === selectedChat._id ||
          data.receiver_id === selectedChat._id)
      ) {
        setSelectedMessage((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [selectedChat]); // Chỉ chạy một lần khi component mount

  // Xử lý join/leave room khi đổi chat
  useEffect(() => {
    if (!socket.current) return;

    if (selectedChat) {
      // Tạo room ID từ ID của cả 2 người dùng để đảm bảo unique
      const roomId = [auth?.user?.id, selectedChat._id].sort().join("-");
      socket.current.emit("join_room", roomId);

      return () => {
        socket.current.emit("leave_room", roomId);
      };
    }
  }, [selectedChat, auth?.user?.id]);

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // Tạo room ID giống như trên
      const roomId = [auth?.user?.id, selectedChat._id].sort().join("-");

      const newMessage = {
        sender_id: auth?.user?.id,
        receiver_id: selectedChat._id,
        content: message,
        roomId: roomId,
      };

      socket.current.emit("send_message", newMessage);
      setMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Header />
        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* User List Panel */}
          <Paper
            elevation={3}
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
              Conversations
            </Typography>
            <Divider />
            <List
              sx={{
                flexGrow: 1,
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {users.map((user) => (
                <ListItem
                  button
                  key={user._id}
                  selected={selectedChat?._id === user._id}
                  onClick={() => setSelectedChat(user)}
                  sx={{
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    "&.Mui-selected": {
                      backgroundColor: "#bbdefb",
                    },
                  }}
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Chat Area */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    backgroundColor: "#f8f9fa",
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {selectedChat.name}
                  </Typography>
                </Paper>

                {/* Messages Area - Now with fixed height and scroll */}
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    // Customize scrollbar
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#888",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#555",
                    },
                  }}
                >
                  {selectedMessage.map((msg, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.sender_id === auth?.user?.id
                            ? "flex-end"
                            : "flex-start",
                        mb: 1,
                      }}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 1.5,
                          maxWidth: "70%",
                          backgroundColor:
                            msg.sender_id === auth?.user?.id
                              ? "#1976d2"
                              : "#fff",
                          borderRadius:
                            msg.sender_id === auth?.user?.id
                              ? "20px 20px 5px 20px"
                              : "20px 20px 20px 5px",
                        }}
                      >
                        <Typography
                          sx={{
                            color:
                              msg.sender_id === auth?.user?.id
                                ? "#fff"
                                : "#000",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {msg.content}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input Area */}
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    backgroundColor: "#fff",
                    height: "30px",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your message..."
                      variant="outlined"
                      size="small"
                    />
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#1565c0",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "#bdbdbd",
                        },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
