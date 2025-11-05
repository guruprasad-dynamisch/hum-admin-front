import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../redux/store";
import { selectAuthLoading } from "../redux/slices/authSlice";
import { useAuth } from "@hooks/use-auth";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PrimaryBtn from "@components/buttons/PrimaryBtn";
import { InputField } from "@components/fields";
import { AuthLayout } from "@components/layouts/AuthLayout";
import { LoginFormData, loginSchema } from "@validations/login-validations";
import "@styles/pages/Login.css";
import { getRouteByKey } from "@utils/helpers";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const isLoading = useAppSelector(selectAuthLoading);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await handleLogin(data.identifier, data.password, data.rememberMe || false);
  };

  return (
    <AuthLayout title="Login to your account">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <InputField
          name="identifier"
          label="Email or Phone"
          mode="react-hook-form"
          placeholder="Enter your email or phone number"
          control={control}
          required
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          mode="react-hook-form"
          placeholder="Enter your password"
          control={control}
          required
        />
        <Box className="form-actions">
          <FormControlLabel
            control={
              <Checkbox
                {...register("rememberMe")}
                id="rememberMe"
                sx={{ color: 'text.secondary' }}
              />
            }
            label={
              <span style={{ color: 'var(--text-secondary, rgba(255,255,255,0.7))' }}>
                Remember me
              </span>
            }
          />
          <Typography
            component="span"
            sx={{
              color: 'var(--link-color)',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--link-hover)',
                textDecoration: 'underline'
              }
            }}
            onClick={() => {
              navigate(getRouteByKey("forgot-password"));
            }}
          >
            Forgot password?
          </Typography>
        </Box>
        <PrimaryBtn
          type="submit"
          loading={isLoading}
          className="login-button"
        >
          Login
        </PrimaryBtn>
        <Box sx={{ textAlign: "center", marginTop: 0 }}>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            Don't have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: 'var(--link-color)',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  color: 'var(--link-hover)',
                  textDecoration: 'underline'
                }
              }}
              onClick={() => {
                navigate(getRouteByKey("register"));
              }}
            >
              Register
            </Typography>
          </Typography>
        </Box>
      </form>
    </AuthLayout>
  );
}