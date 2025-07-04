import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import type { FormEvent } from 'react'
import { useActivities } from '../../lib/hooks/useActivities'

type Props = {
    activity?: Activity
    handleCloseForm: () => void

}
export default function ActivityForm({ activity, handleCloseForm }: Props) {
    const { updateActivity, createActivity } = useActivities();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
        })
        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity)
            handleCloseForm();
        } else {
            await createActivity.mutateAsync(data as unknown as Activity)
            handleCloseForm();
        }
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
                    <Button onClick={handleCloseForm}>cancel</Button>
                    <Button
                        type='submit'
                        color='success'
                        disabled={updateActivity.isPending || createActivity.isPending}

                    >Submit
                    </Button>
                </Box>

            </Stack>

        </Paper>

    )
}
