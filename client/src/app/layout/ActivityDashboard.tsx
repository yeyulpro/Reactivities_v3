
import { Grid2 } from '@mui/material'

import ActivityList from './ActivityList'
import ActivityDetails from './ActivityDetails'
import ActivityForm from './ActivityForm'





type Props = {
    activities: Activity[]
    selectedActivity: Activity | undefined
    handleSelectedActivity: (id: string) => void
    handleCancelSelectedActivity: () => void
    handleOpenForm: (id: string) => void;
    handleCloseForm: () => void;
    editMode: boolean


}

export default function ActivityDashboard({
    activities,
    handleSelectedActivity,
    selectedActivity,
    handleCancelSelectedActivity,
    handleOpenForm,
    handleCloseForm,
    editMode,


}: Props) {

    return (
        <Grid2 container spacing={2} sx={{ textAlign: 'center', padding: '3px' }} >
            <Grid2 size={7}  >
                <ActivityList
                    activities={activities}
                    handleSelectedActivity={handleSelectedActivity}
                />
            </Grid2>
            <Grid2 size={5}>
                {
                    selectedActivity && (!editMode) && <ActivityDetails
                        selectedActivity={selectedActivity}
                        handleCancelSelectedActivity={handleCancelSelectedActivity}
                        handleOpenForm={handleOpenForm} />
                }
                {editMode && <ActivityForm
                    handleCloseForm={handleCloseForm}
                    activity={selectedActivity}
                />}
                {/* <ActivityForm handleCloseForm={handleCloseForm} activity={selectedActivity} handleSubmitForm={handleSubmitForm} /> */}
            </Grid2>

        </Grid2>


    )
}
