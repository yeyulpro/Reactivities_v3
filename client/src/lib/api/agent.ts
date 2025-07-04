import axios from "axios";


export const agent= axios.create({
    baseURL:import.meta.env.VITE_API_URL
});

agent.interceptors.response.use(async response=>{
  return response;
})
