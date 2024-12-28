import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Input } from "@mui/material";
import { uploadResource } from "../api/api";

const ResourceUpload = ({ forumId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      await uploadResource({ file: selectedFile, title, forumId });
      alert("Upload thành công!");
      setSelectedFile(null);
      setTitle("");
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error("Lỗi khi upload tài liệu:", error);
      alert("Đã xảy ra lỗi khi upload.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        p: 4,
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, color: "#3f51b5", fontWeight: "bold" }}
      >
        Upload Tài Liệu
      </Typography>
      <TextField
        label="Tên tài liệu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Input type="file" onChange={handleFileChange} />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpload}
          sx={{
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#2c387e",
            },
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default ResourceUpload;
