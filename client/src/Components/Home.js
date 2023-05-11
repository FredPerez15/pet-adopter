import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Grid } from "@mui/material";
import Image from "mui-image";
import AboutUs from './AboutUs';


const Home = () => {
  return(
  <Grid item xs={12} sm={6} md={4} >
  <Box flex={4} p={2}>
    <ImageList item xs={12} sm={6} md={4}  variant="woven" cols={6} gap={8}>
      {itemData.map((item) => (
    <ImageListItem key={item.img}>
      <Image
        src={`${item.img}?w=161&fit=crop&auto=format`}
        srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
  
  ))}
    </ImageList>
    <AboutUs/>

</Box>
</Grid>
  )
}


const itemData = [
  {
    img: 'https://www.mnpower.com/Content/Images/Company/MPJournal/2017/12202017_01.jpg',
    title: 'Shelter',
  },
  {
    img: 'https://i.pinimg.com/originals/97/19/9c/97199cdda2fec20471eb88c8da150220.jpg',
    title: 'Shelter',
  },
  {
    img: 'https://www.gannett-cdn.com/presto/2020/01/04/PDTF/6d6fe7fb-9db4-4acf-b0ab-f7d6e9f9fa70-IMG_2471.jpg?crop=4031,2268,x0,y373&width=3200&height=1801&format=pjpg&auto=webp',
    title: 'Shelter',
  },
  {
    img: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/30014/1/?bust=1499820341',
    title: 'Shelter',
  },
  {
    img: 'https://parkcountyanimalshelter.org/wp-content/uploads/pcas-new_building-1368x600.jpg',
    title: 'Shelter',
  },
  {
    img: 'https://www.sdhumane.org/assets/images/campus-buildings/el-cajon.jpg',
    title: 'Shelter',
  },
]


export default Home