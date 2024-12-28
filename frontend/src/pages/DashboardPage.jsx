import React, { useContext } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GroupList from "../components/GroupList";
import { AuthContext } from "../components/context/auth.context";

const DashboardPage = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <GroupList />
      </Box>
    </Box>
  );
};

export default DashboardPage;
