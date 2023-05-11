import React from "react";
import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Pets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const resp = await fetch("/pets");
      if (resp.ok) {
        const pets = await resp.json();
        setPets(pets);
      }
    };
    fetchPets();
  }, []);

  const pet = pets.map((el) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={el.id}>
        <Box flex={4} p={2}>
          <Card sx={{ maxWidth: 445 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="20%"
                image={el.image}
                alt="Himmothy"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {el.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Grid>
    );
  });
  return (
    <Grid container direction="row" spacing={2}>
      {pet}
    </Grid>
  );
};

export default Pets;
