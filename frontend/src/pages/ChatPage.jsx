import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // State to track the selected chat
  const [message, setMessage] = useState(""); // State for the new message
  const [chats, setChats] = useState([
    { id: 1, name: "John Doe", messages: ["Hi there!", "How are you?"] },
    {
      id: 2,
      name: "Jane Smith",
      messages: ["Hello!", "Can we meet tomorrow?"],
    },
    { id: 3, name: "Michael Brown", messages: ["Hey!", "What's up?"] },
  ]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const updatedChats = chats.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      );
      setChats(updatedChats);
      setMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {/* Left: Chat List */}
          <Box
            sx={{
              width: "300px",
              borderRight: "1px solid #ddd",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" sx={{ padding: 2 }}>
              Chat History
            </Typography>
            <Divider />
            <List>
              {chats.map((chat) => (
                <ListItem
                  button
                  key={chat.id}
                  selected={selectedChat?.id === chat.id}
                  onClick={() => handleSelectChat(chat)}
                  sx={{
                    "&:hover": { backgroundColor: "#e3f2fd" },
                  }}
                >
                  <ListItemText primary={chat.name} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Right: Chat Screen */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <Box
                  sx={{
                    padding: 2,
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {selectedChat.name}
                  </Typography>
                </Box>

                {/* Chat Messages */}
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: 2,
                    backgroundColor: "#ffffff",
                  }}
                >
                  {selectedChat.messages.map((msg, index) => (
                    <Box
                      key={index}
                      sx={{
                        marginBottom: 2,
                        display: "flex",
                        justifyContent:
                          index % 2 === 0 ? "flex-start" : "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          padding: "8px 12px",
                          borderRadius: 2,
                          backgroundColor:
                            index % 2 === 0 ? "#e3f2fd" : "#bbdefb",
                          maxWidth: "60%",
                        }}
                      >
                        <Typography variant="body2">{msg}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Input Box */}
                <Box
                  sx={{
                    padding: 2,
                    borderTop: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <TextField
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ marginLeft: 2 }}
                  >
                    Send
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  Select a chat to start messaging
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
