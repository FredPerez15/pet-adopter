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

const ShelterDetails = ({user}) => {
  const [shelterDetails, setShelterDetails] = useState([]);
  const [pets, setPets] = useState([]);

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

  const adoptPet = async(pet) => {
    if (user) {
      const resp = await fetch(`/pets/${pet.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id })
      });
      if (resp.ok) {
        const updatedPet = await resp.json();
        setPets(pets.map(p => p.id === updatedPet.id ? updatedPet : p));
      }
    } else {
      console.error('User not logged in');
    }
  }

  return (
    <>
      <Box>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        <Image src={image} height="20%"/>
        <Typography variant="h6" align="center">
          {address}
        </Typography>
        <Box display="flex" justifyContent="space-around" m={2}>
          <Box>
            <Typography variant="h4">Pets</Typography>
            <List>
              {pets.map((pet) => (
                  <ListItem key={pet.id}>
                    <Box>
                      <Image src={pet.image} />
                      <Typography variant="h6">{pet.name}</Typography>
                      <Typography variant="body1">{`Age: ${pet.age}`}</Typography>
                      <Typography variant="body1">{`Animal: ${pet.animal}`}</Typography>
                      <Typography variant="body1">{`Breed: ${pet.breed}`}</Typography>
                      <Button variant="contained" onClick={() => adoptPet(pet)} disabled={!!pet.user_id}>
                        {pet.user_id ? "Adopted!" : "Adopt!"}
                      </Button>
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
