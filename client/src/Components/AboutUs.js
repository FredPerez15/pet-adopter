import React from "react";
import { Typography } from '@mui/material';
import { Box } from "@mui/material";


const AboutUs = () => {
    return(
        <>
        <Box >
            <Typography variant="h1" textAlign="center" sx={{ color: 'primary.main', fontWeight: 'bold', fontStyle: 'italic' }}>
                About Us
            </Typography>
            <Typography variant="h6" textAlign="center" sx={{ color: 'black' }}>
            Looking to bring a new furry friend into your home? Look no further than 
            Pet Adopter - the ultimate app for animal lovers worldwide! Our top 
            priority is ensuring the safety and well-being of all animals, and we're 
            committed to making sure every pet finds a loving forever home. 
            With Pet Adopter, you'll be connected with countless adorable and affectionate 
            pets just waiting to join your family. So why wait? Download Pet Adopter 
            today and start your journey towards finding your new best friend! 
            </Typography>
        </Box>
        </>
    )
}

export default AboutUs