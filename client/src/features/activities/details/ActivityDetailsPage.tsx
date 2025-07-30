import {Grid2, Typography } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities';
import {   useParams } from 'react-router';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';


export default function ActivityDetailsPage() {
   
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity)  <Typography>Loading ...</Typography>


    if (!activity) return <Typography>Activity not Found!~</Typography>
    return (

        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </Grid2>
            <Grid2 size={4}>
               <ActivityDetailsSideBar activity={activity}/>
            </Grid2>

        </Grid2>

      
    )
}
