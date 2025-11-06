import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../redux/store";
import { selectAuthLoading } from "../redux/slices/authSlice";
import { useAuth } from "@hooks/use-auth";
import { Container, Card, Form } from "react-bootstrap";
import { InputField, CheckboxField } from "@components/fields";
import PrimaryBtn from "@components/buttons/PrimaryBtn";
import { LoginFormData, loginSchema } from "@validations/login-validations";
import "@styles/pages/login.scss";
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
    <div className="login-page">
      <Container className="login-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="login-logo-container">
            <img
              src="/assets/humanistics_logo_transparent.webp"
              alt="Humanistics AI"
              className="login-logo-image"
            />
          </div>
        </div>

        {/* Login Card */}
        <Card className="login-card">
          <Card.Body>
            <h1 className="card-title">Welcome Back</h1>
            <p className="card-subtitle">Sign in to your account to continue</p>

            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Email/Phone Input */}
              <div className="form-group">
                <InputField
                  name="identifier"
                  label="Email or Phone"
                  type="text"
                  mode="react-hook-form"
                  placeholder="you@example.com"
                  control={control}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-group">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  mode="react-hook-form"
                  placeholder="Enter your password"
                  control={control}
                  required
                  showPasswordToggle={true}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <CheckboxField
                  name="rememberMe"
                  mode="react-hook-form"
                  control={control}
                  id="rememberMe"
                  label="Remember me"
                />
                <a
                  href="#"
                  className="forgot-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(getRouteByKey("forgotPassword"));
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <PrimaryBtn
                type="submit"
                loading={isLoading}
                className="login-btn"
              >
                Sign In
              </PrimaryBtn>
            </Form>

            {/* Divider */}
            <div className="divider">
              <span>or continue with</span>
            </div>

            {/* Social Login Buttons */}
            <div className="social-login">
              <button className="social-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Google
              </button>

              <button className="social-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#f35325" d="M0 0h8v8H0z"/>
                  <path fill="#81bc06" d="M10 0h8v8h-8z"/>
                  <path fill="#05a6f0" d="M0 10h8v8H0z"/>
                  <path fill="#ffba08" d="M10 10h8v8h-8z"/>
                </svg>
                Microsoft
              </button>
            </div>

            {/* Signup Link */}
            <div className="signup-link">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(getRouteByKey("register"));
                }}
              >
                Sign Up
              </a>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}