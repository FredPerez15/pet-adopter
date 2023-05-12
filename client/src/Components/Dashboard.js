import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import {
  Box,
  List,
  ListItem,
  Button,
  Divider,
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = ({ user }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const resp = await fetch(`/users/${user.id}`);
        if (resp.ok) {
          const userDetails = await resp.json();
          setUserDetails(userDetails);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleEditOpen = (user) => {
    setEditName(user.username);
    setEditAvatar(user.avatar);
    setEditAge(user.age);
    setEditEmail(user.email);
    setEditingUserId(user.id);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditUser = async (user) => {
    if (userDetails) {
      const resp = await fetch(`/users/${user}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingUserId,
          username: editName,
          avatar: editAvatar,
          age: editAge,
          email: editEmail,
        }),
      });
      console.log(resp);
      if (resp.ok) {
        user = await resp.json();
        setUserDetails(user);
        window.location.reload(false);
      } else {
        console.error("Error editing user");
      }
    } else {
      console.error("User not logged in");
    }
  };

  const handleConfirmEdit = async () => {
    handleEditUser(editingUserId, editName, editAge, editAvatar, editEmail);
    handleEditClose();
  };

  const handleDeleteUser = async () => {
    if (user) {
      const resp = await fetch(`/users/${user.id}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        alert("Deleted");
        navigate("/");
      } else {
        console.error("Error deleting user");
      }
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <>
      <Box>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 445, backgroundColor: "#bcbab5" }}>
              <Image src={userDetails.avatar} height="30%" />
              <Typography variant="h4" align="center">
                {userDetails.username}
              </Typography>
              <Typography variant="h5" align="center">
                {userDetails.age}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditOpen(user)}
                />
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteUser(userDetails.id)}
                />
              </Box>
              <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                  <DialogContentText>Please edit your User.</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Avatar"
                    type="text"
                    fullWidth
                    value={editAvatar}
                    onChange={(e) => setEditAvatar(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Age"
                    type="text"
                    fullWidth
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleEditClose}>Cancel</Button>
                  <Button onClick={handleConfirmEdit}>Confirm Edit</Button>
                </DialogActions>
              </Dialog>
            </Card>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-around" m={2}>
          <Box>
            <Typography variant="h4">My Pets</Typography>
            <List>
              {userDetails.pets &&
                userDetails.pets.map((pet) => (
                  <ListItem key={pet.id}>
                    <Box>
                      <Image src={pet.image} />
                      <Typography variant="h6">{pet.name}</Typography>
                      <Typography variant="body1">{`Age: ${pet.age}`}</Typography>
                      <Typography variant="body1">{`Animal: ${pet.animal}`}</Typography>
                      <Typography variant="body1">{`Breed: ${pet.breed}`}</Typography>
                      <Typography variant="body1">{`Shelter: ${pet.shelter.name}`}</Typography>
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography variant="h4">My Reviews</Typography>
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              {userDetails.reviews &&
                userDetails.reviews.map((review) => (
                  <ListItem key={review.id}>
                    {review.shelter.name}: {review.body}
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
