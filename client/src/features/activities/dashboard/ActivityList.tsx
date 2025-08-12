import { Box,  Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Fragment } from "react/jsx-runtime";

export default function ActivityList() {
  const { activitiesGroup, isPending } = useActivities();

  if (!activitiesGroup) return <Typography>No activities found...</Typography>;
  if (isPending) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:3}}>
      {activitiesGroup.pages.map((activities, index) => (
        <Fragment key={index} >
          {activities.items.map((activity) => (
            <ActivityCard activity={activity} key={activity.id} />
          ))}
        </Fragment>
      ))}
    </Box>
  );
}
