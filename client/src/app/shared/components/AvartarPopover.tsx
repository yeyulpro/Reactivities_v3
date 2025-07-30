import * as React from 'react';
import Popover from '@mui/material/Popover';

import type { UserProfile } from '../../../lib/types';
import { Avatar } from '@mui/material';
import { Link } from 'react-router';
import ProfileCard from '../../../features/profiles/ProfileCard';


type Props={
    profile: UserProfile;
}
export default function AvartarPopover({profile}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
       <Avatar
           
              alt={profile.displayName + " image"}
              src={profile.imageUrl}
              component={Link}
              to={`/profiles/${profile.id}`}
               onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
            />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
       <ProfileCard profile={profile}/>
      </Popover>
    </div>
  );
}
