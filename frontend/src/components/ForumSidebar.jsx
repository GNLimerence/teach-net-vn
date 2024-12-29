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
      </Stack>
    </Box>
  );
};

export default ForumSidebar;
