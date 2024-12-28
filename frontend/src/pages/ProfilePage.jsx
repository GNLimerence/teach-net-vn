import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Avatar, Paper, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getProfileApi } from "../api/api";

const ProfilePage = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileApi();
        setProfile(response.data);
      } catch (err) {
        console.log("error fetching");
      }
    };
    fetchProfile();
  }, []);
  console.log(profile);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Paper sx={{ padding: 3, borderRadius: 2, marginTop: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Avatar
                alt={profile?.name}
                src={profile?.profile_image || "/default-avatar.png"}
                sx={{ width: 120, height: 120, marginBottom: 2 }}
              />
              <Typography variant="h6">{profile?.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {profile?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">Chuyên Môn:</Typography>
              <Typography variant="body1">
                {profile?.specialization || "Chưa cập nhật"}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Kinh nghiệm:
              </Typography>
              <Typography variant="body1">
                {profile?.experience_years} năm
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Kỹ năng:
              </Typography>
              <Typography variant="body1">
                {profile?.skills?.join(", ") || "Chưa cập nhật"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;
