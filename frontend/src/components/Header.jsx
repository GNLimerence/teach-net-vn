import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile"); // Điều hướng đến trang Profile
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    navigate("/login"); // Điều hướng về trang Login
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">TeachNetVN</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SearchIcon />
            <TextField
              placeholder="検索..."
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            />
          </Box>
          <IconButton onClick={handleAvatarClick}>
            <Avatar alt="Profile" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileClick}>プロフィール</MenuItem>
            <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
