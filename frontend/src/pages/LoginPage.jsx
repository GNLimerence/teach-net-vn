import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { loginAction } from "../api/api";
import { AuthContext } from "../components/context/auth.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAction({ email, password });
      const { token } = response.data;
      console.log(response);
      setAuth({
        isAuthenticated: true,
        user: {
          email: response?.data?.user?.email ?? "",
          name: response?.data?.user?.name ?? "",
          isAdmin: response?.data?.user?.isAdmin,
        },
      });
      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "問題が発生しました");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "400px",
          p: 4,
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          ログイン
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="電子メール"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="パスワード"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            ログイン
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
