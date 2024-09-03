import { Box } from '@mui/material'
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavbarComponent from '../Components/Navbar/NavbarComponent';


function Userspage() {

  return (<>
    <NavbarComponent pages={[]} />

    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <Box>
        <Card sx={{ minWidth: 305 , padding:"10px"}}>
          <CardContent>
            <Box sx={{ textAlign: "center" , padding:"10px"}}>
              <Typography variant='h5'>Profile </Typography>
            </Box>
            <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
              Name:  <span>{JSON.parse(sessionStorage.getItem("useDetails"))?.name}</span>
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
              Email:   <span>{JSON.parse(sessionStorage.getItem("useDetails"))?.emailId}</span>
            </Typography>
          </CardContent>
        </Card>

      </Box>
    </Box>
  </>
  )
}

export default Userspage