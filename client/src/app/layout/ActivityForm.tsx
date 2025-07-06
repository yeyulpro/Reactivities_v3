import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  const { id } = useParams();
  const { activity, isLoadingActivity, updateActivity, createActivity } = useActivities(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });


    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);

      navigate(`/activities/${activity.id}`)

    } else {
      createActivity.mutate(data as unknown as Activity,{
        onSuccess:  (id) => {      
        navigate(`/activities/${id}`)
      }
    })

    }
  };
  if (isLoadingActivity) return <Typography>Loading....</Typography>
  return (
    <Paper elevation={8} sx={{ width: "100%", borderRadius: 3, mt: "17px" }}>
      <Stack
        p={4}
        display='flex'
        gap={3}
        component='form'
        onSubmit={handleSubmit}
      >
       
        <Typography variant='h3' color='initial' gutterBottom>
          {activity? "Edit Activity": "Create Activity"}
        </Typography>
        <TextField name='title' label='Title' defaultValue={activity?.title} />
        <TextField
          name='description'
          label='Description'
          multiline
          rows={3}
          defaultValue={activity?.description}
        />
        <TextField
          name='category'
          label='Category'
          defaultValue={activity?.category}
        />
        <TextField
          name='date'
          label='Date'
          defaultValue={activity?.date}
          type='date'
        />
        <TextField name='city' label='City' defaultValue={activity?.city} />
        <TextField name='venue' label='Venue' defaultValue={activity?.venue} />

        <Box>
          <Button onClick={() => { }}>cancel</Button>
          <Button
            type='submit'
            color='success'
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
