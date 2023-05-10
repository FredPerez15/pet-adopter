import React from 'react'
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

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
    return <div key={el.id}>{el.name}'s shelter</div>
  })

  return (
    <>
      <Box>
          {shelter}  
      </Box>
    </>
  )
}

export default Shelter