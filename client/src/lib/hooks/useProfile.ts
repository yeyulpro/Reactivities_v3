import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {  Photo, User, UserProfile } from "../types";
import { agent } from "../api/agent";
import { useMemo } from "react";


export const useProfile = (id?: string, predicate?:string) => {
  const queryClient = useQueryClient();

  const {
    data: profile,   // 이 data는 캐시에서 읽어오는 데이터이다...
    isLoading: loadingProfile,
    isError: profileError,
  } = useQuery<UserProfile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agent.get<UserProfile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id&& !predicate,
    staleTime: 1000 * 60 * 5, // 예: 5분 캐시 유지
  });

  const {
    data: photos,
    isLoading:  LoadingPhotos,
    isError: photosError,
  } = useQuery<Photo[]>({
    queryKey: ["photos", id],
    queryFn: async () => {
      const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
      return response.data;
    },
    enabled: !!id &&!predicate,
    staleTime: 1000 * 60 * 5,
  });

  const {data:followings, isLoading :loadingFollowings} = useQuery<UserProfile[]>({
    queryKey:['followings',id, predicate],
    queryFn: async()=>{
      const response = 
                  await agent.get<UserProfile[]>(`/profiles/${id}/follow-list?predicate=${predicate}`)
      return response.data;
    },
    enabled: !!id && !!predicate

  })
  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await agent.post("/profiles/add-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async(photo:Photo) => {
      await queryClient.invalidateQueries({
        queryKey:['photos',id]
      });
      queryClient.setQueryData(['user'], (data:User)=>{
        if(!data) return data;
        return {
            ...data,
            imageUrl: data.imageUrl?? photo.url
        }
      });
      queryClient.setQueryData(['profile', id], (data:UserProfile)=>{
        if(!data) return data;
        return {
            ...data, 
            imageUrl : data.imageUrl ?? photo.url
        }
      })
    
    },
  });

  const setMainPhoto = useMutation({
    mutationFn: async (photo: Photo) =>{
        await agent.put(`/profiles/${photo.id}/setMain`, )
    },
    onSuccess:(_,photo)=>{
        queryClient.setQueryData(['user'],(userData:User)=>{
            if(!userData) return userData;
            return {
                ...userData,
                imageUrl:photo.url
            }
        });
            queryClient.setQueryData(['profile', id],(profile:UserProfile)=>{
            if(!profile) return profile;
            return {
                ...profile,
                imageUrl:photo.url
            }
        })
    }
  })

  const updateFollowing = useMutation({
    mutationFn:async()=>{
      await agent.post(`/profiles/${id}/follow`)
    },
    onSuccess:()=>{                                   // this profile is referring to ['profile', id], and ready to be modified
      queryClient.setQueryData(['profile', id], (profile:UserProfile)=>{
        queryClient.invalidateQueries({queryKey:['followings',id, 'followers']})
        if(!profile || profile.followersCount===undefined) return profile;
        return {...profile ,
            following:!profile.following,
          followersCount: profile.following? 
                                profile.followersCount -1
                                :profile.followersCount +1
        };
      })
    }
  })
//**isCurrentUser**는 현재 보고 있는 프로필의 id가 로그인한 사용자의 id와 같은지를 나타내는 불리언 값이에요.

//즉, 지금 보는 페이지가 내 프로필 페이지인지 확인하는 용도입니다.
  const isCurrentUser = useMemo(() => {          //accountUse를 use cash를 사용하기 위해 import해 줄 필요없다. 왜냐면 전역 매니저인, ㅂqueryClient가 있기 때문이다
    return id === queryClient.getQueryData<User>(["user"])?.id;
  }, [id, queryClient]);

  return {
    profile,
    loadingProfile,
    photos,
    LoadingPhotos,
    isCurrentUser,
    uploadPhoto,
    setMainPhoto,
    updateFollowing,
    followings,
    loadingFollowings,

    errors: {
      profileError,
      photosError,
      
    },
  };
};



