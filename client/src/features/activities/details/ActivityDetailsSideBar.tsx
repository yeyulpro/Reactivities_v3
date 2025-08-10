import {
  Avatar,
  Chip,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { Activity } from "../../../lib/types";

type Props = {
  activity: Activity;
};
export default function ActivityDetailsSideBar({ activity }: Props) {
  // const following = true;
  return (
    <>
      <Paper
        sx={{
          textAlign: "center",
          border: "none",
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6">
          {activity.attendees.length} people going
        </Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        {activity.attendees.map((attendee) => (
          <Grid2 key={attendee.id} container alignItems="center">
            <Grid2 size={8}>
              <List sx={{ display: "flex", flexDirection: "column" }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={attendee.displayName + " image"}
                      src={attendee.imageUrl}
                    />
                  </ListItemAvatar>
                  <Stack>
                    <ListItemText>
                      <Typography variant="h6">{attendee.displayName}</Typography>
                    </ListItemText>
                    {attendee.following && (
                      <Typography variant="body2" color="orange">
                        Following
                      </Typography>
                    )}
                  </Stack>
                </ListItem>
              </List>
            </Grid2>
            <Grid2
              size={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 1,
              }}
            >
              {activity.hostId == attendee.id && (
                <Chip
                  label="Host"
                  color="warning"
                  variant="filled"
                  sx={{ borderRadius: 2 }}
                />
              )}
              {/* { att.following&& (
                  <Typography variant="body2" color="orange">
                    Following
                  </Typography>
                )} */}
            </Grid2>
          </Grid2>
        ))}
      </Paper>
    </>
  );
}
