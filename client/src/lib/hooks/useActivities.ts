import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agent } from "../api/agent";
import type { Activity } from "../types";
import { useAccount } from "./useAccount";
import { useLocation } from "react-router";

export const useActivities = (id?: string) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const { data: activities, isPending } = useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && location.pathname === "/activities" && !!currentUser,
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery<Activity>({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
  });
  type UpdateActivityDto = Omit<Activity, "isCancelled">;

  const updateActivity = useMutation({
    mutationFn: async (activity: UpdateActivityDto) => {
      await agent.put("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
  type CreateActivityDto = Omit<Activity, "id" | "isCancelled">;
  const createActivity = useMutation({
    mutationFn: async (activity: CreateActivityDto) => {
      const response = await agent.post("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
