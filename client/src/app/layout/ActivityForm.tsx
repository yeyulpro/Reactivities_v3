import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import type { FormEvent } from 'react'

type Props = {
    activity?: Activity
    handleCloseForm: () => void
    handleSubmitForm:(activity:Activity)=>void
}
export default function ActivityForm({ activity, handleCloseForm,handleSubmitForm }: Props) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data : {[key:string]:FormDataEntryValue}={}
        formData.forEach((value, key) => {
            data[key] = value;
        })
        if(activity) data.id=activity.id;
        handleSubmitForm(data as unknown as Activity)
    }

    return (
        <Paper elevation={8} sx={{ width: '100%', borderRadius: 3, mt: '17px' }}>
            
            <Stack p={4} display='flex' gap={3} component='form' onSubmit={handleSubmit}>
                <Typography variant="subtitle1" color="initial" gutterBottom>Edit new activity</Typography>
                <TextField name='title' label="Title" defaultValue={activity?.title} />
                <TextField name='description' label="Description" multiline rows={3} defaultValue={activity?.description} />
                <TextField name='category' label="Category" defaultValue={activity?.category} />
                <TextField name='date' label="Date" defaultValue={activity?.date} type='date' />
                <TextField name='city' label="City" defaultValue={activity?.city} />
                <TextField name='venue' label="Venue" defaultValue={activity?.venue} />

                <Box >
                    <Button type='submit' color='success' >Submit</Button>
                    <Button onClick={handleCloseForm}>cancel</Button>
                </Box>

            </Stack>

        </Paper>

    )
}
