import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchMyForumApi } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";

const GroupList = () => {
  const [groups, setGroups] = React.useState(null);
  const navigate = useNavigate();

  const fetchMyForum = async () => {
    try {
      const res = await fetchMyForumApi();
      if (res) {
        setGroups(res.data);
      }
    } catch (error) {
      console.error("Error fetching forums:", error);
      setGroups([]);
    }
  };

  React.useEffect(() => {
    fetchMyForum();
  }, []);

  const handleGroupClick = (id) => {
    navigate(`/forum/${id}`);
  };

  return (
    <Grid container spacing={3} sx={{ padding: "20px" }}>
      {groups === null ? (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <CircularProgress />
        </Box>
      ) : groups.length > 0 ? (
        groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group._id}>
            <Card
              sx={{
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "150px", // Điều chỉnh chiều dài
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                },
              }}
              onClick={() => handleGroupClick(group._id)}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {group.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Box sx={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          <Typography variant="h6" color="textSecondary">
            まだグループがありません。参加するか、新しいグループを作成してください!
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default GroupList;
