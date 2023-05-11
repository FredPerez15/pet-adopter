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
} from "@mui/material";
import Image from "mui-image";

const ShelterDetails = () => {
  const [shelterDetails, setShelterDetails] = useState([]);
  const { id } = useParams();
  const { name, address } = shelterDetails;

  useEffect(() => {
    const fetchDetails = async () => {
      const resp = await fetch(`/shelters/${id}`);
      if (resp.ok) {
        const shelterDetails = await resp.json();
        setShelterDetails(shelterDetails);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <>
      <Box>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        <Typography variant="h6" align="center">
          {address}
        </Typography>
        <Box display="flex" justifyContent="space-around" m={2}>
          <Box>
            <Typography variant="h4">Pets</Typography>
            <List>
              {shelterDetails.pets &&
                shelterDetails.pets.map((pet) => (
                  <ListItem key={pet.id}>
                    <Box>
                      <Image src={pet.image} />
                      <Typography variant="h6">{pet.name}</Typography>
                      <Typography variant="body1">{`Age: ${pet.age}`}</Typography>
                      <Typography variant="body1">{`Animal: ${pet.animal}`}</Typography>
                      <Typography variant="body1">{`Breed: ${pet.breed}`}</Typography>
                      <Button variant="contained">Adopt!</Button>
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography variant="h4">Reviews</Typography>
            <List>
              {shelterDetails.reviews &&
                shelterDetails.reviews.map((review) => (
                  <ListItem key={review.id}>{review.content}</ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShelterDetails;
