import React from "react";
import { Box, IconButton, Typography, Stack, Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const ForumSidebar = ({ forumInfo, activeTab, setActiveTab }) => {
  return (
    <Box
      sx={{
        padding: "16px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {forumInfo?.name}
        </Typography>
        <Box>
          <Button
            variant={activeTab === "posts" ? "contained" : "outlined"}
            sx={{
              marginRight: "8px",
              backgroundColor: activeTab === "posts" ? "#3f51b5" : "inherit",
              color: activeTab === "posts" ? "white" : "#3f51b5",
            }}
            onClick={() => setActiveTab("posts")}
          >
            Bài đăng
          </Button>
          <Button
            variant={activeTab === "resources" ? "contained" : "outlined"}
            sx={{
              color: activeTab === "resources" ? "white" : "#3f51b5",
              backgroundColor:
                activeTab === "resources" ? "#3f51b5" : "inherit",
            }}
            onClick={() => setActiveTab("resources")}
          >
            Tệp
          </Button>
          <IconButton>
            <HelpOutlineIcon sx={{ color: "#3f51b5" }} />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default ForumSidebar;
