import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { Box, Grid, List, ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Dashboard = ({ user }) => {
  const [userDetails, setUserDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/users/${id}`);
      if (resp.ok) {
        const userDetails = await resp.json();
        setUserDetails(userDetails);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Grid container>
      <Grid item sm={6}>
        <Box>
          <Card sx={{ maxWidth: 445 }}>
            <Image src={user.avatar} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography>{user.age}</Typography>
              <Typography>{user.pets}</Typography>
              <Typography>{user.reviews}</Typography>
            </CardContent>
          </Card>
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
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Box>
          <Box>
            <Typography variant="h4">My Reviews</Typography>
            <List>
              {userDetails.reviews &&
                userDetails.reviews.map((review) => (
                  <ListItem key={review.id}>{review.content}</ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
