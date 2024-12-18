import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import UserModal from "../components/user/UserModal";

const usersInitial = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
  },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState(usersInitial);
  const [open, setOpen] = useState(false);

  // Modal open/close handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add user handler
  const handleAddUser = (newUser: {
    name: string;
    email: string;
    role: string;
  }) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
        >
          추가
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Modal */}
      <UserModal open={open} onClose={handleClose} onAddUser={handleAddUser} />
    </div>
  );
};

export default Users;
