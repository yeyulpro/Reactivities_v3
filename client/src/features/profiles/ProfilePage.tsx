import { Grid2, Typography } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

import { useParams } from "react-router-dom";
import { useProfile } from "../../lib/hooks/useProfile";

export default function ProfilePage() {
  const { id } = useParams();

  const { profile, loadingProfile,  } = useProfile(id);
  if (loadingProfile) return <Typography>Loading...</Typography>;
  if (!profile) return <Typography>Profile is not found.</Typography>;
  return (
    <Grid2>
      <Grid2 size={12}>
        <ProfileHeader />
        <ProfileContent />
      </Grid2>
    </Grid2>
  );
}
