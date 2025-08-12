import NavBar from "./NavBar";
import { Box, Container, CssBaseline } from "@mui/material";

import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  return (
    <Box sx={{ bgcolor: "#F1E7E7", minHeight: "100vh" }}>
      <CssBaseline />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container maxWidth='xl' sx={{pt:10}}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;
