import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { Box, Button, Paper, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextInput from "../../app/shared/components/TextInput";

import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activates");
      },
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
          Log In
        </Typography>
      </Box>
      <TextInput name="email" control={control} label="Email" />
      <TextInput name="password" control={control} label="Password" />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Submit
      </Button>
      <Typography
        sx={{
          display: "flex",
          gap: 2,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        Don't have an account?
        <Typography
          component={Link}
          to="/register"
          color="primary"
          sx={{ textDecoration: "none" }}
        >
          Sign Up
        </Typography>
      </Typography>
    </Paper>
  );
}
