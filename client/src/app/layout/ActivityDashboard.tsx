import { Grid2,  } from "@mui/material";

import ActivityList from "./ActivityList";


export default function ActivityDashboard() {
  return (
    <Grid2 container spacing={2} sx={{ textAlign: "center", padding: "3px" }}>
      <Grid2 size={7}>
        <ActivityList />
      </Grid2>
      <Grid2 size={5}>
        activity filter will go here..
      </Grid2>
    </Grid2>
  );
}
