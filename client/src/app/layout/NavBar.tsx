import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";

import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { currentUser } = useAccount();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#E69DB8" }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
                <MenuItem component={NavLink} to="/">
                  <Typography variant="h5">Activities</Typography>
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
                <MenuItemLink to={"/activities"}>Activities</MenuItemLink>
               
                <MenuItemLink to={"/Counter"}>Counter</MenuItemLink>
                <MenuItemLink to={"/errors"}>Test Errors</MenuItemLink>
              </Box>
              <Box display="flex" gap={3} alignItems="center">
                {currentUser ? (
                  <UserMenu />
                ) : (
                  <>
                    <MenuItemLink to="/login">Login</MenuItemLink>
                    <MenuItemLink to="/register">Register</MenuItemLink>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
