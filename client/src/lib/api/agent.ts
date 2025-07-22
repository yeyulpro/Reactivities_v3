import axios from "axios";
import { toast } from "react-toastify";

import { parseISO } from "date-fns";

export const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true
});

agent.interceptors.response.use(
  async (response) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    if (response.data?.date){
      response.data.date = parseISO(response.data.date);
    }
    console.log("intercepted! date type changed to Date() ", response.data );
    return response;
  },
  async (error) => {
    const { status } = error.response;
    switch (status) {
      case 400:
        toast.error("bad request.");
        break;
      case 401:
        toast.error("Unauthorized.");
        break;
      case 404:
        toast.error('Not Found')
        break;
      case 500:
        toast.error("Server error.");
        break;
      default:
        break;
    }
    return Promise.reject(error); // 에러는 다시 던져줘야 axios가 인식함
  }
);
