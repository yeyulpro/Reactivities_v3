import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchemaType,
} from "../../../lib/schemas/activitySchema";
import TextInput from "../../../app/shared/components/TextInput";

import { categoryOptions } from "./categoryOptions";
import SelectInput from "../../../app/shared/components/SelectInput";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
  const { reset, handleSubmit, control } = useForm<ActivitySchemaType>({
    resolver: zodResolver(activitySchema),
    mode: "onTouched",
    defaultValues: {
      title: "", // 문자열 초기값
      description: "", // 예: 다른 필드들도
      category: "",
      date: new Date(),
      location: {
        city: "",
        venue: "",
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const { id } = useParams();
  const { activity, isLoadingActivity, updateActivity, createActivity } =
    useActivities(id);
  const navigate = useNavigate();
  useEffect(() => {
    if (activity) {
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchemaType) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest,   city: location.city ?? "",
    venue: location.venue ?? "",
    latitude: location.latitude,
    longitude: location.longitude,};
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...flattenedData },
          { onSuccess: () => navigate(`/activities/${activity.id}`) }
        );
      } else {
        await createActivity.mutateAsync(flattenedData, {
          // onSuccess:(data=>{console.log("return data from mutation",data )})
          onSuccess: (id) => navigate(`/activities/${id}`),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingActivity) return <Typography>Loading....</Typography>;

  return (
    <Paper elevation={8} sx={{ width: "100%", borderRadius: 3, mt: "17px" }}>
      <Stack
        p={4}
        display="flex"
        gap={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h3" color="initial" gutterBottom>
          {activity ? "Edit Activity" : "Create Activity"}
        </Typography>

        <TextInput label="Title" control={control} name="title" />
        <TextInput label="Description" control={control} name="description" />
        <Box display="flex" gap={3}>
          <SelectInput
            label="Category"
            items={categoryOptions}
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>

        <LocationInput control={control} name="location" label="Location" />

        <Box>
          <Button>cancel</Button>
          <Button
            type="submit"
            color="success"
          
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
