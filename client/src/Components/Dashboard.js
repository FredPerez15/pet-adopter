import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { Box, List, ListItem, Divider, Grid, Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Dashboard = ({ user }) => {
  const [userDetails, setUserDetails] = useState([]);

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
                {/* <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton> */}
              </Typography>
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
