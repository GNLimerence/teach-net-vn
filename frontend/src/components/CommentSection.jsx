import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  createComment,
  getCommentsByPostId,
  increaseAgreeCountApi,
} from "../api/api";

const CommentSection = ({ open, onclose, selectedPost }) => {
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const handleFetchComment = async () => {
    const res = await getCommentsByPostId({ postId: selectedPost?._id });
    if (res) {
      setComments(res.data.data);
    }
  };
  const handleAddComment = async () => {
    const data = {
      postId: selectedPost?._id,
      content: newComment,
      authorId: "67573a956843e349fae8d810",
    };
    const res = await createComment(data);
    if (res.data.message === "Comment created") {
      handleFetchComment();
      setNewComment("");
    }
  };
  const handleIncreaseAgreeCount = async (commentId, test) => {
    try {
      const res = await increaseAgreeCountApi({
        commentId,
        userId: "67573a956843e349fae8d810",
      });
      if (res.data) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  agreedBy: res.data.agreedBy,
                  agreeCount: res.data.agreeCount,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Error increasing agree count:", error);
    }
  };
  useEffect(() => {
    if (open) {
      handleFetchComment();
    }
  }, [open, selectedPost]);
  return (
    <Dialog
      open={open}
      onClose={onclose}
      scroll="paper"
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle>Bình luận</DialogTitle>
      <DialogContent>
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <Box
              key={comment._id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <Stack direction="column">
                  <Typography sx={{ fontWeight: "bold" }}>
                    {comment.author_id.name} - {comment.created_at}
                  </Typography>
                  <Typography>{comment.content}</Typography>
                </Stack>
                <IconButton
                  onClick={() => handleIncreaseAgreeCount(comment._id, comment)}
                  sx={{
                    color: comment.agreedBy.includes("67573a956843e349fae8d810") // Kiểm tra userId
                      ? "#3f51b5" // Đã agree
                      : "#757575", // Chưa agree
                  }}
                >
                  <ThumbUpAltIcon />
                  <Typography sx={{ marginLeft: 0.5 }}>
                    {comment.agreeCount}
                  </Typography>
                </IconButton>
              </Stack>
            </Box>
          ))
        ) : (
          <>Ko co comments</>
        )}
      </DialogContent>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Thêm bình luận..."
          fullWidth
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddComment();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddComment}>
                  <SendIcon sx={{ color: "#3f51b5" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Dialog>
  );
};

export default CommentSection;
