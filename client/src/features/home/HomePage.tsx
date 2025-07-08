import { Box, Button, Paper, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';


export default function HomePage() {
  return (
    <Paper sx={{
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      alignItems: 'center', alignContent: 'center', justifyContent: 'center',
      height:'100vh', bgcolor:'#e1bee7'
    }}>
      <Box  sx={{ display: 'flex',  alignItems: 'center', justifyContent: 'center', color:'white', gap:3 }}
      >
        
          <PeopleIcon sx={{ fontSize: 100 }} />
          <Typography variant="h1" >Reactivity</Typography>
        </Box>

        <Typography variant="h2">Welcome to Reactivities</Typography>
        <Button component={Link} to='/activities'  variant='contained' sx={{height:80, fontSize:'1.2rem'}}>Take me to the activities</Button>

     
    </Paper>
  )
}
