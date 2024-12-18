import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (formData: { name: string; email: string; role: string }) => void;
}

const UserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onAddUser,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onAddUser(formData);
    setFormData({ name: "", email: "", role: "" });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add New User
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          margin="normal"
        />
        <Box sx={{ textAlign: "right", marginTop: "16px" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
