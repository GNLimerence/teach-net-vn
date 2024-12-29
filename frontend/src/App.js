import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ForumPage from "./pages/ForumPage";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DiscussionPage from "./pages/DiscussionPage";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/LoginPage";
import axios from "./api/axiosCustomize";
import { AuthContext } from "./components/context/auth.context";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const { auth, setAuth, setAppLoading, appLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get("/v1/api/auth/me");
        if (res) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.data.email,
              name: res.data.name,
              isAdmin: res.data.isAdmin,
              id: res.data.id,
            },
          });
        }
      } catch (err) {}
    };
    fetchAccount();
  }, []);
  return (
    <Router>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="/forum/:id" element={<ForumPage />} />
        <Route path="/forum/:id/:postId" element={<DiscussionPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
