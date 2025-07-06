import NavBar from "./NavBar";
import { Box, Container, CssBaseline } from "@mui/material";

import { Outlet } from "react-router";

function App() {
  return (
    <Box sx={{ bgcolor: "#F1E7E7" }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl'>
        <Outlet/>
      </Container>
    </Box>
  );
}

export default App;
