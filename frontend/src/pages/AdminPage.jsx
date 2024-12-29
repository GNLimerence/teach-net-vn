import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  createForumApi,
  createUser,
  fetchMyForumApi,
  getAllUsersApi,
  joinForumApi,
} from "../api/api";

const AdminPage = () => {
  const [topics, setTopics] = useState();
  const [users, setUsers] = useState();

  const [openTopicDialog, setOpenTopicDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [openAddUserToTopicDialog, setOpenAddUserToTopicDialog] =
    useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [emailToAdd, setEmailToAdd] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await getAllUsersApi();
      if (response) {
        console.log(response);
        setUsers(response.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchForum = async () => {
    try {
      const response = await fetchMyForumApi();
      if (response) {
        console.log(response);
        setTopics(response.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUsers();
    fetchForum();
  }, []);
  const handleAddTopic = async () => {
    if (newTopic.trim()) {
      try {
        await createForumApi({ name: newTopic });
        await fetchForum();
        setNewTopic("");
        setOpenTopicDialog(false);
      } catch (error) {}
    }
  };

  // Handle deleting a topic
  const handleDeleteTopic = (topic) => {
    setTopics((prev) => prev.filter((t) => t !== topic));
  };

  // Handle adding a new user
  const handleAddUser = async () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      try {
        await createUser({
          name: newUser.name.trim(),
          email: newUser.email.trim(),
        });
        await fetchUsers();
        setNewUser({ name: "", email: "" });
        setOpenUserDialog(false);
      } catch (error) {}
    }
  };

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // Hàm mở dialog
  const handleOpenAddUserToTopicDialog = (topic) => {
    setSelectedTopic(topic);
    setOpenAddUserToTopicDialog(true);
  };

  // Hàm thêm người dùng vào topic
  const handleAddUserToTopic = async () => {
    if (emailToAdd.trim()) {
      try {
        const response = await joinForumApi({
          email: emailToAdd.trim(),
          forumId: selectedTopic._id,
        });
        console.log(response);
        await fetchForum(); // Cập nhật lại danh sách topic
        setEmailToAdd("");
        setOpenAddUserToTopicDialog(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ p: 3 }}>
          {/* Topics Management */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Quản lý chủ đề
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenTopicDialog(true)}
              sx={{ mb: 2 }}
            >
              Thêm chủ đề
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Chủ đề</TableCell>
                    <TableCell align="right">Hành động</TableCell>
                    <TableCell align="right">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topics?.map((topic, index) => (
                    <TableRow key={index}>
                      <TableCell>{topic.name}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="#3f51b5"
                          onClick={() => handleOpenAddUserToTopicDialog(topic)}
                        >
                          <PersonAddIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteTopic(topic)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Users Management */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Quản lý người dùng
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenUserDialog(true)}
              sx={{ mb: 2 }}
            >
              Thêm người dùng
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        {/* Dialog for Adding Topics */}
        <Dialog
          open={openTopicDialog}
          onClose={() => setOpenTopicDialog(false)}
        >
          <DialogTitle>Thêm chủ đề mới</DialogTitle>
          <DialogContent>
            <TextField
              label="Chủ đề"
              fullWidth
              variant="outlined"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTopicDialog(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleAddTopic}>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Adding Users */}
        <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
          <DialogContent>
            <TextField
              label="Tên"
              fullWidth
              variant="outlined"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUserDialog(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleAddUser}>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openAddUserToTopicDialog}
          onClose={() => setOpenAddUserToTopicDialog(false)}
        >
          <DialogTitle>Thêm người dùng vào chủ đề</DialogTitle>
          <DialogContent>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={emailToAdd}
              onChange={(e) => setEmailToAdd(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddUserToTopicDialog(false)}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleAddUserToTopic}>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminPage;
