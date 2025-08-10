import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAccount } from "../../lib/hooks/useAccount";
import { Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";



export default function UserMenu() {
  const { currentUser, logoutUser } = useAccount();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logoutUser.mutate();
  };

  return (
    <div>
      <Button
        sx={{ color: "inherit", fontSize: "1.1rem" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            fontSize: "large",
          }}
        >
          <Avatar
            alt="current user image"
            src={currentUser?.imageUrl}
            sx={{ width: 44, height: 44 }}
          />
          Hello {currentUser?.displayName}
        </Box>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem component={Link} to={`/profiles/${currentUser?.id}`} onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
