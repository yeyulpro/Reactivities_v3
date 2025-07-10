// import { Box, Button, Typography, } from "@mui/material";
import { Box, Button, ButtonGroup, Container, List, ListItemText, Typography } from "@mui/material";
import { useStore } from "../lib/hooks/useStore";
import { observer, } from "mobx-react-lite";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();

  return (
    <>
      <Container sx={{display:'flex', justifyContent:'space-between'}}>
        <Box sx={{display:'flex', flexDirection:'column', alignContent:'center', alignItems:'cener'}}>
          <Typography variant='h4' gutterBottom>
            {counterStore.count}
          </Typography>

          <ButtonGroup>
            <Button
              onClick={() => counterStore.increment()}
              variant='contained'
              sx={{ bgcolor: "green", mr: 2 }}
            >
              Increase
            </Button>
            <Button
              onClick={() => counterStore.decrement()}
              variant='contained'
              sx={{ bgcolor: "error", mr: 2 }}
            >
              Decrease
            </Button>
            <Button
              onClick={() => counterStore.increment(5)}
              variant='contained'
              color='primary'
            >
              Increase by5
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center', }}>
          <Typography variant="h4" color="initial">Counter Event ({counterStore.eventCount})</Typography>
          <List>
            {counterStore.events.map((event, index)=>(
              <ListItemText key={index}>{event}</ListItemText>
            ))}
          </List>
        </Box>

      </Container>

    </>
  );
});

export default Counter