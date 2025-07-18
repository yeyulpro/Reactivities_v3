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
import { format, parseISO } from 'date-fns';

type Props = {
    activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
    console.log("here is time?!",activity.date)
    const isHost = false;
    const isGoing = false;
    const label = isHost ? "Your are hosting" : "You are going";
    const isCancelled = false;
    const color = isHost ? "secondary" : isGoing ? "warning" : "default";

    if (!activity) return <Typography>Loading</Typography>;

    return (
        <Card elevation={3} sx={{ width: "100%" }}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <CardHeader
                    avatar={<Avatar sx={{ height: 80, width: 80 }} />}
                    title={activity.title}
                    slotProps={{ title: { fontWeight: "bold", fontSize: 20 } }}
                    subheader={
                        <>
                            Hosted by <Link to={`/profiles/bob`}>Bob</Link>
                        </>
                    }
                />
                <Box display='flex' flexDirection='column' gap={2} mr={2}>
                    {(isHost || isGoing) && (
                        <Chip label={label} color={color} sx={{ borderRadius: 2 }}></Chip>
                    )}
                    {isCancelled && (
                        <Chip label='Cancelled' color='error' sx={{ borderRadius: 2 }} />
                    )}
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <CardContent sx={{ p: 0 }}>
                <Box
                    display='flex'
                    alignContent='center'
                    justifyContent='normal'
                    mb={2}
                    px={2}
                >
                    <Box  display='flex' alignItems='center' flexGrow={0}>
                        <AccessTimeIcon sx={{ mr: 1 }} />
                        <Typography variant='body2' flexGrow={0} sx={{ whiteSpace: 'nowrap' }} >
                            {	format(parseISO(activity.date), "yyyy-MM-dd HH:mm")}
                        </Typography>
                    </Box>

                    <PlaceIcon sx={{ ml: 1 }} />
                    <Typography variant='body2'>{activity.venue}</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Box
                    display='flex'
                    gap={2}
                    sx={{ backgroundColor: "grey.200", py: 3, pl: 3 }}
                >
                    Attendees go here.
                </Box>
            </CardContent>

            <CardContent sx={{ pb: 2 }}>
                <Typography variant='body2'>{activity.description}</Typography>

                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    variant='contained'
                    size='medium'
                    sx={{ display: "flex", justifySelf: "end", borderRadius: 3 }}
                >
                    view
                </Button>
            </CardContent>
        </Card>
    );
}
