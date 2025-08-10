// import type { ZodNumberFormat } from "zod";
// import type { StringValidation } from "zod/v3";

type User={
  id:string,
  displayName:string,
  email:string,
  imageUrl?:string,


}
type UserProfile={
  id:string
  displayName:string;
  bio?: string
  imageUrl?:string
  followersCount?:number
  followingCount?:number
  following?:boolean
}


type Activity = {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  attendees: UserProfile[];
  isGoing: boolean;
  isHost:boolean;
  hostId:string;
  hostDisplayName:string
  hostImageUrl?:string
};

type ChatComment={
  id:string,
  createdAt: Date,
  body: string,
  userId: string,
  displayName: string
  imageUrl?:string

}



type Photo ={
  id:string,
  url:string
}

export type CreateActivityDto = Omit<Activity, "id" | "isCancelled">;
export type UpdateActivityDto = Omit<Activity, "isCancelled">;



type LocationlQSuggestion ={
  place_id: string
  osm_id: string
  osm_type: string
  licence: string
  lat: string
  lon: string
  boundingbox: string[] 
  class: string
  type: string
  display_name: string
  display_place: string
  display_address: string
  address: LocationlQAddress
}
type LocationlQAddress ={
  name: string
  house_number: string
  road: string
  neighbourhood?: string
  suburb?: string

  town?:string
  village?:string
  

  city?: string

  state?: string
  postcode?: string
  country: string
  country_code: string
}