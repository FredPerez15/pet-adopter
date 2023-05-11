import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { Box, List, ListItem, Divider } from "@mui/material";

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
        <Image
          src={userDetails.avatar}
          style={{ alignItems: "center" }}
          height="20%"
          width="20%"
        />
        <Typography variant="h5" align="center" s>
          {userDetails.username}
        </Typography>
        <Typography align="center">{userDetails.age}</Typography>
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
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Box>
          <Divider orientation="vertical" flexItem />
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
      </Box>
      {/* </Grid> */}
    </>
  );
};

export default Dashboard;
