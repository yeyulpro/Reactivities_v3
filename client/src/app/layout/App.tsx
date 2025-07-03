
import NavBar from "./NavBar";
import { Box, Container, CssBaseline } from "@mui/material";
import ActivityDashboard from "./ActivityDashboard";
import axios from "axios";
import { useState, useEffect } from "react";



function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then(response => setActivities(response.data))
      .catch((error: unknown) => console.log(error));
  }, [])

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
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
  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = { ...activity, id: activities.length.toString() }
      setActivities([...activities, newActivity])
    }
    setEditMode(false);
  }
  const handleDeleteActivity=(id:string)=>{
    setActivities(activities.filter(x=>x.id!==id))
  }


  return (
    <Box sx={{ bgcolor: '#F1E7E7' }}>
      <CssBaseline />
      <NavBar handleOpenForm={handleOpenForm} />
      <Container maxWidth='xl'>
        <ActivityDashboard
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          handleCancelSelectedActivity={handleCancelSelectedActivity}
          handleCloseForm={handleCloseForm}
          editMode={editMode}
          handleOpenForm={handleOpenForm}
          handleSubmitForm={handleSubmitForm}
          handleDeleteActivity={handleDeleteActivity}

        />
      </Container>



    </Box>
  )
}

export default App
