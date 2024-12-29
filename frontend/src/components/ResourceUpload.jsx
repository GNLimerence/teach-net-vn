import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { uploadResource } from "../api/api";

const ResourceUpload = ({ postId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      alert("すべての情報を入力してください。");
      return;
    }
    try {
      await uploadResource({ file: selectedFile, title, postId });
      alert("アップロード成功しました!");
      setSelectedFile(null);
      setTitle("");
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error(
        "ドキュメントのアップロード中にエラーが発生しました:",
        error
      );
      alert("アップロード中にエラーが発生しました。");
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
        ドキュメントをアップロード
      </Typography>
      <TextField
        label="文書名"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button
        variant="contained"
        component="label"
        color="primary"
        sx={{
          mt: 2,
          backgroundColor: "#3f51b5",
          "&:hover": {
            backgroundColor: "#2c387e",
          },
        }}
      >
        ファイルを選択
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept="*"
          lang="ja"
        />
      </Button>
      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          選択されたファイル: {selectedFile.name}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>
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
          アップロード
        </Button>
      </Box>
    </Box>
  );
};

export default ResourceUpload;
