import { Grid2,  } from "@mui/material";

import ActivityList from "./ActivityList";
import DashboardFilter from "./DashboardFilter";


export default function ActivityDashboard() {
  return (
    <Grid2 container spacing={2} sx={{ textAlign: "center", padding: "3px" }}>
      <Grid2 size={8}>
        <ActivityList />
      </Grid2>
      <Grid2 size={4}>
        <DashboardFilter/>
      </Grid2>
    </Grid2>
  );
}
