import React, { useState } from "react";
import {
  Box,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CommentSection from "./CommentSection";
import { createPostApi } from "../api/api";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts, forumId, onRefreshPosts }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const navigate = useNavigate();
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPostTitle("");
    setPostDescription("");
  };

  const handleCreatePost = async () => {
    if (postTitle && postDescription) {
      try {
        await createPostApi({
          forumId,
          title: postTitle,
          content: postDescription,
        });
        handleCloseDialog();
        onRefreshPosts();
      } catch (err) {
        console.error("Error creating post:", err);
      }
    }
  };

  const handleOpenCommentDialog = (post) => {
    if (post) {
      setSelectedPost(post);
      setOpenCommentDialog(true);
    }
  };

  const handleNavigateToDiscussionPage = (post) => {
    if (post) {
      navigate(`/forum/${forumId}/${post._id}`);
    }
  };

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Box
            key={post._id}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              cursor: "pointer",
              display: "flex",
              alignItems: "flex-start",
            }}
            onClick={() => handleNavigateToDiscussionPage(post)}
          >
            <Avatar
              src={post.created_by.avatar}
              alt={post.created_by.name}
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginRight: 1 }}
                >
                  {post.created_by.name}
                </Typography>
                - {post.created_at}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                {post.title}
              </Typography>
              <Typography variant="body1">{post.content}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body1">Không có bài đăng nào.</Typography>
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpenDialog}
      >
        <AddIcon />
      </Fab>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Tạo bài đăng mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Tiêu đề"
            type="text"
            fullWidth
            variant="outlined"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Mô tả"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleCreatePost} variant="contained">
            Tạo bài đăng
          </Button>
        </DialogActions>
      </Dialog>

      <CommentSection
        open={openCommentDialog}
        onclose={() => setOpenCommentDialog(false)}
        selectedPost={selectedPost}
      />
    </>
  );
};

export default PostList;
