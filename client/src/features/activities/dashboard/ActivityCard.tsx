import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
// import { format,  } from 'date-fns';
import type { Activity, } from "../../../lib/types";
import AvartarPopover from "../../../app/shared/components/AvartarPopover";



type Props = {
  activity: Activity;

};

export default function ActivityCard({ activity,  }: Props) {
  
  const label = activity.isHost ? "Your are hosting" : "You are going";
  const color = activity.isHost
    ? "secondary"
    : activity.isGoing
    ? "warning"
    : "default";

  if (!activity) return <Typography>Loading</Typography>;

  return (
    <Card elevation={3} sx={{ width: "100%" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={<Avatar src={activity.hostImageUrl}  sx={{ height: 80, width: 80 }} alt="Image of Host"/>}
          title={activity.title}
          slotProps={{ title: { fontWeight: "bold", fontSize: 20 } }}
          subheader={
            <>
              Hosted by{" "}
              <Link to={`/profiles/${activity.hostId}`}>
                {activity.hostDisplayName}
              </Link>
            </>
          }
        />
        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(activity.isHost || activity.isGoing) && (
            <Chip label={label} color={color} sx={{ borderRadius: 2 }} />
          )}
          {activity.isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box
          display="flex"
          alignContent="center"
          justifyContent="normal"
          mb={2}
          px={2}
        >
          <Box display="flex" alignItems="center" flexGrow={0}>
            <AccessTimeIcon sx={{ mr: 1 }} />
            <Typography
              variant="body2"
              flexGrow={0}
              sx={{ whiteSpace: "nowrap" }}
            >
              {new Date(activity.date).toLocaleString()}
             
            </Typography>
          </Box>

          <PlaceIcon sx={{ ml: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
      
        <Box
          display="flex"
          gap={2}
          sx={{ backgroundColor: "grey.200", py: 3, pl: 3 }}
        >
          {activity.attendees.map((attendee) => (
           <AvartarPopover key={attendee.id} profile={attendee} />
          ))}
        </Box>
      </CardContent>

      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>

        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          variant="contained"
          size="medium"
          sx={{ display: "flex", justifySelf: "end", borderRadius: 3 }}
        >
          view
        </Button>
      </CardContent>
    </Card>
  );
}
