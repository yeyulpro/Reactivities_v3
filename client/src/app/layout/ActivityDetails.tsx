import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useActivities } from '../../lib/hooks/useActivities'


type Props = {
    selectedActivity: Activity
    handleCancelSelectedActivity: () => void
    handleOpenForm: (id: string) => void

}

export default function ActivityDetails({ selectedActivity, handleCancelSelectedActivity, handleOpenForm }: Props) {

    const { activities } = useActivities();
    const activity = activities?.find(x => x.id === selectedActivity.id)

    if (!activity) return <Typography>Loading</Typography>
    return (
        <Card sx={{ borderRadius: 3, mt: "16px" }}>
            <CardMedia
                component='img'
                sx={{ height: 140 }}
                image={`/images/categoryImages/${activity.category}.jpg`}
                title="green iguana" />
            <CardContent>
                <Typography variant="h3" color="initial">{activity.title}</Typography>
                <Typography variant="subtitle1" color="initial">{activity.date}v</Typography>
                <Typography variant="body1" color="initial">{activity.description}v</Typography>
            </CardContent>

            <CardActions>
                <Button onClick={() => handleOpenForm(activity.id)} >Edit</Button>
                <Button onClick={handleCancelSelectedActivity}>Cancel</Button>
            </CardActions>
        </Card>
    )
}
