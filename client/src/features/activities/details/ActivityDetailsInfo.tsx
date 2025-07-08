import Place from "@mui/icons-material/Place";
import { Divider, Grid2, Paper, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format } from 'date-fns';
type Props = {
    activity: Activity
}

export default function ActivityDetailsInfo({ activity }: Props) {
    return (
        <Paper sx={{ mb: 2 }}>

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <InfoIcon color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{activity.description}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <CalendarTodayIcon color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{format(activity.date, "do MMMM yyyy")}</Typography>
                </Grid2>
            </Grid2>
            <Divider />

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <Place color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>
                        {activity.venue + ',' + activity.city}
                    </Typography>
                </Grid2>
            </Grid2>
        </Paper>

    )
}
