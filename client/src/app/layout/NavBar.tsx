
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Container } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  handleOpenForm: () => void
}
export default function NavBar({ handleOpenForm }: Props) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ bgcolor: "#E69DB8" }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" color="initial" >News</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                <Button>Home</Button>
                <Button>About</Button>
                <Button>Contact</Button>
              </Box>
              <Button  onClick={handleOpenForm} sx={{ color: "white" }}>Create Activity</Button>
            </Toolbar>
          </Container>

        </AppBar>
      </Box>

    </>


  )
}
