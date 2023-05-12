// react imports
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//MUI imports
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Grid
} from "@mui/material";
import Image from "mui-image";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShelterDetails = ({ user }) => {

  const [shelterDetails, setShelterDetails] = useState([]);
  const [pets, setPets] = useState([]);

  //reviews state
  const [open, setOpen] = useState(false);
  const [reviewBody, setReviewBody] = useState("");

  //review edits
  const [editOpen, setEditOpen] = useState(false);
  const [editBody, setEditBody] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);

  const { id } = useParams();
  const { name, address, image } = shelterDetails;

  useEffect(() => {
    const fetchDetails = async () => {
      const resp = await fetch(`/shelters/${id}`);
      if (resp.ok) {
        const shelterDetails = await resp.json();
        setShelterDetails(shelterDetails);
        setPets(shelterDetails.pets || []);
      }
    };
    fetchDetails();
  }, [id]);

  const adoptPet = async (pet) => {
    if (user) {
      const resp = await fetch(`/pets/${pet.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });
      if (resp.ok) {
        const updatedPet = await resp.json();
        setPets(pets.map((p) => (p.id === updatedPet.id ? updatedPet : p)));
      }
    } else {
      console.error("User not logged in");
    }
  };

  //reviews
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddReview = async () => {
    if (user) {
      const resp = await fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: reviewBody,
          user_id: user.id,
          shelter_id: id,
        }),
      });
      if (resp.ok) {
        const newReview = await resp.json();
        setShelterDetails({
          ...shelterDetails,
          reviews: [...(shelterDetails.reviews || []), newReview],
        });
        handleClose();
      } else {
        console.error("Error adding review");
      }
    } else {
      console.error("User not logged in");
    }
  };
  //editing review
  const handleEditOpen = (review) => {
    setEditBody(review.body);
    setEditingReviewId(review.id);
    setEditOpen(true);
  };

 
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditReview = async (reviewId, newBody) => {
    if (user) {
      const resp = await fetch(`/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: newBody,
        }),
      });
      if (resp.ok) {
        const updatedReview = await resp.json();
        setShelterDetails({
          ...shelterDetails,
          reviews: shelterDetails.reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          ),
        });
      } else {
        console.error("Error editing review");
      }
    } else {
      console.error("User not logged in");
    }
  };

  const handleConfirmEdit = async () => {
    handleEditReview(editingReviewId, editBody);
    handleEditClose();
  };
  
  const handleDeleteReview = async (reviewId) => {
    if (user) {
      const resp = await fetch(`/reviews/${reviewId}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        setShelterDetails({
          ...shelterDetails,
          reviews: shelterDetails.reviews.filter(
            (review) => review.id !== reviewId
          ),
        });
      } else {
        console.error("Error deleting review");
      }
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        <Image src={image} height="20%" />
        <Typography variant="h6" align="center" mb={2}>
          {address}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center">Pets</Typography>
            <List>
              {pets.map((pet) => (
                <ListItem key={pet.id}>
                  <Box>
                    <Image src={pet.image} />
                    <Typography variant="h6">{pet.name}</Typography>
                    <Typography variant="body1">{`Age: ${pet.age}`}</Typography>
                    <Typography variant="body1">{`Animal: ${pet.animal}`}</Typography>
                    <Typography variant="body1">{`Breed: ${pet.breed}`}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => adoptPet(pet)}
                      disabled={!!pet.user_id}
                    >
                      {pet.user_id ? "Adopted!" : "Adopt!"}
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={false} md={1} style={{ borderRight: '1px solid gray' }}></Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" align="center">Reviews</Typography>
            <List>
              {user && (
                <Box display="flex" justifyContent="center" mb={2}>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Review
                </Button>
                </Box>
              )}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Review</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please share your thoughts about this shelter.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Review"
                    type="text"
                    fullWidth
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleAddReview}>Add Review</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Please edit your review.
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    label="Review"
                    type="text"
                    fullWidth
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleConfirmEdit}>Confirm Edit</Button>
                </DialogActions>
                </Dialog>

              {shelterDetails.reviews &&
                shelterDetails.reviews.map((review) => (
                    <ListItem key={review.id}>
                    <Box>
                        <Typography>{review.body}</Typography>
                        {user && user.id === review.user_id && (
                        <Box mt={1} display="flex" justifyContent="space-between">
                            <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditOpen(review)}
                            />
                            <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteReview(review.id)}
                            />
                        </Box>
                        )}
                    </Box>
                    </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
  
  
};

export default ShelterDetails;


