import { Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import { useActivities } from '../../lib/hooks/useActivities';

type Props = {
    activity: Activity
    handleSelectedActivity: (id: string) => void

}

export default function ActivityCard({ activity, handleSelectedActivity }: Props) {
    const { deleteActivity } = useActivities();

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom color="initial">{activity.title}</Typography>
                <Typography>{activity.category}</Typography>
                <Typography>{activity.date}</Typography>
                <Typography>{activity.city}</Typography>
                <Typography variant="subtitle2" color="initial">{activity.description}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Chip label={activity.category} sx={{ color: 'green' }} variant='outlined'></Chip>
                <Button onClick={() => handleSelectedActivity(activity.id)} size='small' variant='contained' sx={{ bgcolor: ' #E69DB8' }}>view</Button>
                <Button onClick={() => deleteActivity.mutate(activity.id)} disabled={deleteActivity.isPending} size='small' variant='contained' sx={{ bgcolor: 'error.main' }}>Delete</Button>
            </CardActions>
        </Card>
    )
}
