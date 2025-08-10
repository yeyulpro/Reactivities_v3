import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { agent } from "../api/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import type { User } from "../types";
import { useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast,  } from "react-toastify";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const registerUser = useMutation({
    mutationFn: async(creds:RegisterSchema)=>{
      await agent.post("/account/register", creds)
    },
    onSuccess: async()=>{
      toast.success("register successful");
       navigate('/login');  
    }
    
  })


  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post("/login?useCookies=true", creds, {withCredentials: true,}); // 이곳에 따로 withcredentials안써줘도 된다. 이미
    }, // axios.create로 인스턴스를 만들 당시 이미 설정 해 주었기 때문에.however just leave it as a practice.
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        //**invalidateQueries(['user'])**는 "user 정보를 다시 가져오라"는 뜻; login 전엔 정보 없음;null/undefined.
        queryKey: ["user"],
      });
      await navigate("/activities");
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["activities"] });
      navigate("/");
    },
  });

  const { data: currentUser, isLoading:loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<User>("/account/user-info", {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: !queryClient.getQueryData(['user'])
   
    
  });
  return {
    loginUser,
    currentUser,
    logoutUser,
    loadingUserInfo,
    registerUser
  };
};
