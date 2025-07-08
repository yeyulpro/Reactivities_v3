import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import FilterListIcon from "@mui/icons-material/FilterList";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function DashboardFilter() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, borderRadius: 3 }}
    >
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant='h6'
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <FilterListIcon sx={{ mr: 1 }} />
            Filter
          </Typography>
          <MenuList>
            <MenuItem>
              <ListItemText primary='All Event' />
            </MenuItem>
            <MenuItem>
              <ListItemText primary='I am Going' />
            </MenuItem>
            <MenuItem>
              <ListItemText primary='I am hosting' />
            </MenuItem>
          </MenuList>
        </Box>
      </Paper>
      <Box component={Paper} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
        <Typography
          variant='h6'
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <EventIcon sx={{ mr: 1 }} />
          Select Date
        </Typography>
        <Calendar />
      </Box>
    </Box>
  );
}
