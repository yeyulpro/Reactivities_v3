import { List, ListItem, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityList() {
  const { activities, isPending } = useActivities();
  if (!activities || isPending) return <Typography>Loading...</Typography>;
  return (
    <List>
      {activities.map((activity) => (
        <ListItem key={activity.id}>
          <ActivityCard activity={activity}/>
        </ListItem>
      ))}
    </List>
  );
}
