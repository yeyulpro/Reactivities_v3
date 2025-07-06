import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useActivities } from '../../lib/hooks/useActivities'
import { Link, useNavigate, useParams } from 'react-router';



export default function ActivityDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity)  <Typography>Loading ...</Typography>


    if (!activity) return <Typography>Activity not Found!~</Typography>
    return (
        <Card sx={{ borderRadius: 3, mt: "16px" }}>
            <CardMedia
                component='img'
                sx={{ height: 140 }}
                image={`/images/categoryImages/${activity.category}.jpg`}
                title="green iguana" />
            <CardContent>
                <Typography variant="h3" color="initial">{activity.title}</Typography>
                <Typography variant="subtitle1" color="initial">{activity.date}</Typography>
                <Typography variant="body1" color="initial">{activity.description}</Typography>
            </CardContent>

            <CardActions>
                <Button component={Link} to={`/manage/${activity.id}`} >Edit</Button>
                <Button onClick={() => { navigate('/activities') }}>Cancel</Button>
            </CardActions>
        </Card>
    )
}
