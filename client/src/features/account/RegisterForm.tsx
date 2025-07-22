import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Button, Paper, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import {
  registerSchema,
  type RegisterSchema,
} from "../../lib/schemas/registerSchema";
// import type { AxiosError } from "axios";

export default function RegisterForm() {

  const { registerUser } = useAccount();
  const {
    handleSubmit,
    control,
    // setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data,{
        // onError:(error:unknown)=> {
        //     const axiosError = error as AxiosError;
        //     const validationErrors =(axiosError.response?.data as any)?.errors;
        //     console.log("hey hey "+error.name)
        //  if (Array.isArray(error)){
        //     error.forEach(err=>{
        //         if(err.includes("Email")) setError('email',{message:err});
        //         else if (err.includes('Password')) setError("password", {message:err})
        // })
        //  }
        // },
    });
    
  };


  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        borderRadius: 3,
        p: 5,
        mt: 3,
      }}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        <LockOpenIcon fontSize="large" />
        <Typography variant="h5" color="initial">
          Register
        </Typography>
      </Box>
      <TextInput name="email" control={control} label="Email" />
      <TextInput name="displayName" control={control} label="displayName" />
      <TextInput name="password" control={control} label="Password" />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
        fullWidth
      >
        Register
      </Button>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            gap: 2,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          Already have an account?
        </Typography>
        <Typography
          component={Link}
          to="/login"
          color="primary"
          sx={{ textDecoration: "none" }}
        >
          Sign In
        </Typography>
      </Box>
    </Paper>
  );
}
