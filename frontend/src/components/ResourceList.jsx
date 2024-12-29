import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemText,
  ListItemIcon,
  IconButton,
  Modal,
  Paper,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getResourseList } from "../api/api";

const ResourceList = ({ postId }) => {
  const [resources, setResources] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResourseList({ postId });
        setResources(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài liệu:", error);
      }
    };

    fetchResources();
  }, [postId]);

  const handleDownload = (fileUrl) => {
    const downloadUrl = `http://localhost:8080${fileUrl}`;
    window.open(downloadUrl, "_blank");
  };

  const handlePreview = (fileUrl) => {
    setPreviewFile(`http://localhost:8080${fileUrl}`);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        p: 4,
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        mt: 4,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, color: "#3f51b5", fontWeight: "bold" }}
      >
        文書一覧
      </Typography>
      <List
        sx={{
          maxHeight: "300px",
          overflow: "auto",
          backgroundColor: "#ffffff",
        }}
      >
        {resources.map((resource) => (
          <Paper
            key={resource._id}
            sx={{
              mb: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemIcon>
                <FilePresentIcon sx={{ color: "#3f51b5" }} />
              </ListItemIcon>
              <ListItemText
                primary={resource.title}
                secondary={resource.tags?.join(", ")}
              />
            </Box>
            <Box>
              <IconButton
                edge="end"
                color="primary"
                onClick={() => handlePreview(resource.file_url)}
                sx={{ mr: 1, color: "#3f51b5" }}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                edge="end"
                color="primary"
                onClick={() => handleDownload(resource.file_url)}
                sx={{ color: "#3f51b5" }}
              >
                <DownloadIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </List>

      <Modal open={!!previewFile} onClose={handleClosePreview}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: "90vh",
          }}
        >
          {previewFile && previewFile.endsWith(".pdf") && (
            <iframe
              src={previewFile}
              title="Xem trước PDF"
              width="100%"
              height="500px"
              style={{ border: "none" }}
            />
          )}
          {previewFile && previewFile.match(/\.(jpg|jpeg|png|gif)$/i) && (
            <img
              src={previewFile}
              alt="Xem trước"
              style={{ width: "100%", maxHeight: "500px" }}
            />
          )}
          {previewFile && !previewFile.match(/\.(pdf|jpg|jpeg|png|gif)$/i) && (
            <Typography variant="body1" color="error">
              このファイルはプレビューできません。
            </Typography>
          )}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <IconButton onClick={handleClosePreview} color="error">
              近い
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ResourceList;
