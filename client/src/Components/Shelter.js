import React from 'react'
import { Box, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import icon from '../images/icon.jpeg';

const Shelter = () => {

  const [shelters, setShelters] = useState([])

  useEffect(() => {
    const fetchShelters = async () => {
      const resp = await fetch("/shelters")
      if (resp.ok){
        const shelters = await resp.json()
        setShelters(shelters)
      }
    }
    fetchShelters()
  }, [])

  const shelter  = shelters.map((el) => {
    return(
      <Box flex={4} p={2}>
        <Grid xs={1}>
        <Card sx={{ maxWidth: 445 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="20%"
              image={icon}
              alt="Himmothy"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This will be about the Shelter
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
      </Box>
    )
  })

  return (
    <>{shelter}</>
  )
}

export default Shelter