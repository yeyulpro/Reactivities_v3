import { List, ListItem } from '@mui/material'
import ActivityCard from './ActivityCard'
type Props = {
    activities: Activity[]
    handleSelectedActivity: (id:string)=>void
    handleDeleteActivity:(id:string)=>void
   
}
export default function ActivityList({ activities, handleSelectedActivity,handleDeleteActivity }: Props) {
    return (

        <List >
            {
                activities.map((activity) => (
                    <ListItem key={activity.id}
                    >
                        <ActivityCard 
                            activity={activity}
                            handleSelectedActivity={handleSelectedActivity}
                            handleDeleteActivity={handleDeleteActivity}
                            />
                    </ListItem>


                ))
            }
   
        </List>





    )
}
