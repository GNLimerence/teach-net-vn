import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getProfileApi, updateProfileApi } from "../api/api";

const ProfilePage = () => {
  const [profile, setProfile] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    specialization: "",
    experience_years: "",
    skills: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileApi();
        setProfile(response.data);
        setFormValues({
          name: response.data.name || "",
          specialization: response.data.specialization || "",
          experience_years: response.data.experience_years || "",
          skills: response.data.skills?.join(", ") || "",
        });
      } catch (err) {
        console.log("error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedData = {
        ...formValues,
        skills: formValues.skills.split(",").map((skill) => skill.trim()),
      };
      const response = await updateProfileApi(updatedData);
      setProfile(response.data.user);
      setOpenDialog(false);
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

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
              <Typography variant="h6">専門分野:</Typography>
              <Typography variant="body1">
                {profile?.specialization || "まだ更新されていません"}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                経験：
              </Typography>
              <Typography variant="body1">
                {profile?.experience_years} 年
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                スキル：
              </Typography>
              <Typography variant="body1">
                {profile?.skills?.join(", ") || "まだ更新されていません"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleOpenDialog}
              >
                プロフィールを更新
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Dialog cập nhật hồ sơ */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>プロフィールを更新</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="名前"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="専門知識"
              name="specialization"
              value={formValues.specialization}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="長年の経験"
              name="experience_years"
              value={formValues.experience_years}
              onChange={handleInputChange}
              type="number"
            />
            <TextField
              fullWidth
              margin="normal"
              label="スキル（カンマ区切り）"
              name="skills"
              value={formValues.skills}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              キャンセル
            </Button>
            <Button onClick={handleUpdateProfile} color="primary">
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ProfilePage;
