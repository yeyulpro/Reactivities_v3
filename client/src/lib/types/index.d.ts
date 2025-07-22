type User={
  id:string,
  displayName:string,
  email:string,
  imageUrl?:string
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
};
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