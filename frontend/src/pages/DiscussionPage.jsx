import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { createComment, getCommentsByPostId, getPostByIdApi } from "../api/api";

const DiscussionPage = () => {
  const { id, postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // State for new comment
  const navigate = useNavigate();

  const handleBack = () => {
    setPost("");
    navigate(`/forum/${id}`);
  };

  const fetchComments = async () => {
    const response = await getCommentsByPostId({ postId });
    if (response) {
      setComments(response.data.data);
    }
  };

  useEffect(() => {
    const fetchPostInfo = async () => {
      const response = await getPostByIdApi({ postId });
      if (response) {
        setPost(response.data);
      } else {
        console.error("Error");
      }
    };
    fetchComments();
    fetchPostInfo();
  }, [postId]);

  const handleAddComment = async () => {
    const data = {
      postId,
      authorId: "67573a956843e349fae8d810",
      content: newComment,
    };
    const res = await createComment(data);
    if (res.data.message === "Comment created") {
      fetchComments();
      setNewComment("");
    }
  };

  return (
    <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px",
          }}
        >
          <IconButton onClick={handleBack}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" color="#3f51b5">
            {post?.title}
          </Typography>
        </Box>

        <Stack spacing={2} padding={2} direction="row">
          <Stack spacing={1} direction="row">
            <PersonIcon sx={{ color: "gray" }} />
            <Typography color="gray" fontWeight="bold">
              {post?.created_by?.name}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <AccessTimeIcon sx={{ color: "gray" }} />
            <Typography color="gray">{post?.created_at}</Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          padding={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box
            sx={{
              flexGrow: 1,
              maxHeight: "550px",
              overflowY: "auto",
            }}
          >
            {comments?.map((comment) => (
              <Box
                key={comment._id}
                sx={{
                  display: "flex",
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  marginBottom: 2,
                  padding: "8px",
                }}
              >
                <Box
                  sx={{
                    minWidth: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                    backgroundColor: "#f9f9f9",
                    borderRight: "1px solid #ddd",
                  }}
                >
                  <Avatar
                    src={comment.author_id.avatar_url}
                    alt={comment.author_id.name}
                  />
                  <Typography fontWeight="bold" color="#3f51b5">
                    {comment.author_id?.name}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {comment.created_at}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography>{comment.content}</Typography>
                </Box>
              </Box>
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 3,
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <TextField
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a new comment..."
                variant="outlined"
              />
              <Button
                onClick={handleAddComment}
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>

          {/* Thread Info */}
          <Box
            sx={{
              width: "300px",
              border: "1px solid #ddd",
              borderRadius: 2,
              padding: 2,
              backgroundColor: "#f9f9f9",
              position: "sticky",
              top: "16px",
              maxHeight: "150px",
            }}
          >
            <Typography variant="h6" color="#3f51b5" gutterBottom>
              Thread Info
            </Typography>
            <Stack spacing={1}>
              <Typography>
                <strong>Created by:</strong> {post?.created_by?.name}
              </Typography>
              <Typography>
                <strong>Created at:</strong> {post?.created_at}
              </Typography>
              <Typography>
                <strong>Replies:</strong> {comments?.length || 0}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default DiscussionPage;
