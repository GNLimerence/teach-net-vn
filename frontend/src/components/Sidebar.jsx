import React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "60px",
        backgroundColor: "#3f51b5",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Stack spacing={3}>
        <IconButton color="inherit" onClick={handleNavigateToHome}>
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit">
          <GroupIcon />
        </IconButton>
        <IconButton color="inherit">
          <MessageIcon />
        </IconButton>
        <IconButton color="inherit">
          <CalendarMonthIcon />
        </IconButton>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Sidebar;
