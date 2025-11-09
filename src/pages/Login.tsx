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
import { NavLink } from "react-router-dom";
import Logo from "@components/common/Logo";
import { useError } from "@hooks/use-error";
import { useToast } from "@hooks/use-toast";
import { GoogleIcon, MicrosoftIcon } from "@components/index";
import { SecondaryBtn } from "@components/buttons";

export default function Login() {
  const isLoading = useAppSelector(selectAuthLoading);
  const { handleLogin } = useAuth();
  const { getError, handleFieldErrors } = useError();
  const { showError } = useToast();

  const { control, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>({
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
    try {
      await handleLogin(data.identifier, data.password, data.rememberMe || false);
    } catch (error: any) {
      // Handle login errors here if needed
      if (!handleFieldErrors(error, setError)) {
        showError(getError(error));
      }
    }
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        {/* Logo Section */}
        <Logo containerClassName='logo-section' wrapperClassName='login-logo-container' className='login-logo-image' />

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
                <NavLink to={getRouteByKey("forgotPassword")} className={'forgot-link'}>Forgot Password?</NavLink>
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
              <SecondaryBtn className="social-btn">
                <GoogleIcon /> Google
              </SecondaryBtn>
              <SecondaryBtn className="social-btn">
                <MicrosoftIcon />Microsoft
              </SecondaryBtn>
            </div>

            {/* Signup Link */}
            <div className="signup-link">
              Don't have an account?{" "}
              <NavLink to={getRouteByKey("register")}>Sign Up</NavLink>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}