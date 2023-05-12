// react imports
import React from "react";
import { Link } from "react-router-dom";

// Mui imports
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Shelter = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const fetchShelters = async () => {
      const resp = await fetch("/shelters");
      if (resp.ok) {
        const shelters = await resp.json();
        setShelters(shelters);
      }
    };
    fetchShelters();
  }, []);

  const shelter = shelters.map((el) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={el.id}>
        <Box flex={4} p={2}>
          <Link to={`${el.id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 445, backgroundColor: "#bcbab5" }}>
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
          </Link>
        </Box>
      </Grid>
    );
  });

  return (
    <Grid container direction="row" spacing={2}>
      {shelter}
    </Grid>
  );
};

export default Shelter;
