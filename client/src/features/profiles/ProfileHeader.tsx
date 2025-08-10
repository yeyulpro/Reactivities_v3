import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";


export default function ProfileHeader() {
  const { id } = useParams();
  const { profile, updateFollowing, isCurrentUser } = useProfile(id);

  if (!profile) return null;

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, mt: 2, p: 4 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={8}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={profile.imageUrl}
              alt={profile.displayName + " image"}
              sx={{ width: 150, height: 150 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4" color="initial">
                {profile.displayName}
              </Typography>
              {profile.following && (
                <Chip label="Following" color="primary" variant="outlined" />
              )}
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={4}>
          <Stack spacing={2} alignItems="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Box textAlign="center">
                <Typography variant="h6" color="initial">
                  Followers
                </Typography>
                <Typography variant="h3" color="initial">
                  {profile.followersCount}
                </Typography>
              </Box>
              <Box>
                <Box textAlign="center">
                  <Typography variant="h6" color="initial">
                    Following
                  </Typography>
                  <Typography variant="h3" color="initial">
                    {(profile.followingCount )}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {!isCurrentUser && (
              <>
                <Divider sx={{ width: "100%" }} />

                <Button
                  variant="outlined"
                  disabled={updateFollowing.isPending}
                  fullWidth
                  onClick={() => updateFollowing.mutate()}
                  color={profile.following ? "error" : "success"}
                >
                  {profile.following ? "Unfollow" : "Follow"}
                </Button>
              </>
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Paper>
  );
}
