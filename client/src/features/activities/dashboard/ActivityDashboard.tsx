import { Button, Grid2 } from "@mui/material";

import ActivityList from "./ActivityList";
import DashboardFilter from "./DashboardFilter";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDashboard() {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = useActivities();

  return (
    <Grid2 container spacing={2} sx={{ textAlign: "center", padding: "3px" }}>
      <Grid2 size={8}>
        <ActivityList />
        <Button
          onClick={() => fetchNextPage()}
          sx={{ my: 2, float: "right" }}
          variant="contained"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Load More
        </Button>
      </Grid2>
      <Grid2 size={4} sx={{position:'sticky', top:112, alignSelf:'flex-start'}}>
        <DashboardFilter />
      </Grid2>
    </Grid2>
  );
}
