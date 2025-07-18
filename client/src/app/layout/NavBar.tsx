import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";

import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ bgcolor: "#E69DB8" }}>
          <Container maxWidth='xl'>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
                <MenuItem component={NavLink} to='/'>
                  <Typography variant='h5'>Activities</Typography>
                </MenuItem>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexGrow: 1,
                  gap: 3,
                }}
              >
                <MenuItemLink to={"/activities"}>
                  Activities
                </MenuItemLink>
                <MenuItemLink to={"/createactivity"}>
                  Create Activity
                </MenuItemLink>
                <MenuItemLink to={"/Counter"}>
                  Counter
                </MenuItemLink>
                <MenuItemLink to={"/errors"}>
                  Test Errors
                </MenuItemLink>
              </Box>
              <Button onClick={() => { }} sx={{ color: "white" }}>
                Create Activity
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
