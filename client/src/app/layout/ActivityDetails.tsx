import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'


type Props={
    activity:Activity
    handleCancelSelectedActivity:()=>void
    handleOpenForm:(id:string)=>void
    
}

export default function ActivityDetails({
    activity,
     handleCancelSelectedActivity,
    handleOpenForm}:Props) {
    return (
        <Card sx={{ borderRadius: 3, mt:"16px" }}>
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
                <Button onClick={()=>handleOpenForm(activity.id)} >Edit</Button>
                <Button onClick={handleCancelSelectedActivity}>Cancel</Button>
            </CardActions>
        </Card>
    )
}
