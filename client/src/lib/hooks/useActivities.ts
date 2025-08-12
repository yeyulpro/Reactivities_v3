import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { agent } from "../api/agent";
import type { Activity, PagedList } from "../types";
import { useAccount } from "./useAccount";
import { useLocation } from "react-router";

export const useActivities = (id?: string) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const {
    data: activitiesGroup,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<Activity, string>>({
    queryKey: ["activities"],
    queryFn: async ({pageParam= null }) => {
      const response = await agent.get<PagedList<Activity, string>>(
        "/activities",
        {
          params: {  // query string  (주소 뒤에 붙는 ?cursor=...&pageSize=3 같은 부분)을 의미
            cursor: pageParam,
            pageSize: 3,
          },                                                                             //API /activities 호출해서 받은 response.data가 하나의 page
        }                                                                               //useInfiniteQuery가 그걸 여러 번 받아서 data.pages 배열로 관리
        //  select 내부에서 그 배열을 순회하며 page별로 원하는 변환(가공)을 함
      );
      return response.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !id && location.pathname === "/activities" && !!currentUser,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({                   // page는 fn이 반환한 각 페이지 데이터, 각 api응답 한 페이지 단위, pages는 그것의 배열 , 그것의 집단 객체가 useInfiniteQuery 객체
        ...page,
        items: page.items.map((activity) => {
          const host = activity.attendees.find((x) => x.id == activity.hostId);
          return {
            ...activity,
            isHost: currentUser?.id === activity.hostId,
            isGoing: activity.attendees.some((x) => x.id === currentUser?.id),
            hostImageUrl: host?.imageUrl,
          };
        }),
      })),
    }),
  });
// useInfiniteQuery
//  ├── data
//  │    ├── pages (배열)
//  │    │    ├── page 1 (response.data from first API call)
//  │    │    ├── page 2 (response.data from second API call)
//  │    │    └── ...
// 첫 요청 → cursor = null, size = 3 → [2,3,4] + nextCursor(5)

// fetchNextPage 호출 → cursor = 5 → [5,6,7] + nextCursor(8)

// 서버에서 더 이상 데이터 없으면 hasNextPage = false
  const { data: activity, isLoading: isLoadingActivity } = useQuery<Activity>({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      const host = data.attendees.find((x) => x.id == data.hostId);

      return {
        ...data,
        isHost: currentUser?.id === data.hostId,
        isGoing: data.attendees.some((x) => x.id === currentUser?.id),
        hostImageUrl: host?.imageUrl,
      };
    },
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

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/activities/${id}/attend`);
    },
    onMutate: async (activityId: string) => {
      await queryClient.cancelQueries({ queryKey: ["activities", activityId] });

      const prevActivity = queryClient.getQueryData<Activity>([
        "activity",
        activityId,
      ]);
      queryClient.setQueryData<Activity>(
        ["activities", activityId],
        (oldActivity) => {
          if (!oldActivity || !currentUser) {
            return oldActivity;
          }
          const isHost = oldActivity.hostId === currentUser.id;
          const isAttending = oldActivity.attendees.some(
            (x) => x.id === currentUser.id
          );

          return {
            ...oldActivity,
            isCancelled: isHost
              ? !oldActivity.isCancelled
              : oldActivity.isCancelled,
            attendees: isAttending
              ? isHost
                ? oldActivity.attendees
                : oldActivity.attendees.filter((x) => x.id !== currentUser.id)
              : [
                  ...oldActivity.attendees,
                  {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    imageUrl: currentUser.imageUrl,
                    bio: "",
                    followersCount: 0,
                    followingsCount: 0,
                    following: false,
                  },
                ],
          };
        }
      );
      return { prevActivity };
    },
    onError: (error, activityId, context) => {
      console.log(error);
      if (context?.prevActivity) {
        queryClient.setQueryData(
          ["activities", activityId],
          context.prevActivity
        );
      }
    },
    // onSuccess를 사용하지 않고 optimistic updating을 위해 onMutate를 사용하겠다.
    // onSuccess:async()=>{

    //   await queryClient.invalidateQueries({

    //     queryKey:['activities',id]
    //   })

    // }
  });

  return {
    activitiesGroup,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    // activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance,
  };
};
