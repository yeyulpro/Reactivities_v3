
import NavBar from "./NavBar";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import ActivityDashboard from "./ActivityDashboard";
import { useState } from "react";
import { useActivities } from "../../lib/hooks/useActivities";



function App() {
  const { activities, isPending } = useActivities();
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)





  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id))
  }
  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectedActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true)
  }
  const handleCloseForm = () => {
    setEditMode(false)
  }




  return (

    <Box sx={{ bgcolor: '#F1E7E7' }}>
      <CssBaseline />
      <NavBar handleOpenForm={handleOpenForm} />
      <Container maxWidth='xl'>
        {
          !activities || isPending ?
            <Typography>Loading....</Typography>
            : (
              <ActivityDashboard
                activities={activities}
                handleSelectedActivity={handleSelectedActivity}
                selectedActivity={selectedActivity}
                handleCancelSelectedActivity={handleCancelSelectedActivity}
                handleCloseForm={handleCloseForm}
                editMode={editMode}
                handleOpenForm={handleOpenForm}



              />
            )

        }

      </Container>



    </Box>
  )
}

export default App
