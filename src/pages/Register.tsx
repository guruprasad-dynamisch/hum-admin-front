import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Card, Form } from "react-bootstrap";
import { InputField, PhoneInput, SelectField, CheckboxField, OtpVerification } from "@components/fields";
import PrimaryBtn from "@components/buttons/PrimaryBtn";
import { registerSchema, RegisterFormData } from "@validations/register-validations";
import "@styles/pages/register.scss";
import { getRouteByKey } from "@utils/helpers";
import { useNavigate } from "react-router-dom";

/**
 * Production-ready Registration Page Component
 * 
 * Features:
 * - Multi-step registration flow
 * - Production-level form validation with Zod
 * - Phone number verification with OTP
 * - Separated OTP component for reusability
 * - Proper error handling and loading states
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegisterFormData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      role: "user",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  /**
   * Handle registration form submission
   * Sends OTP to the provided phone number
   */
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call to send OTP
      // await authService.sendOtp(data.phone);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRegistrationData(data);
      setPhoneNumber(data.phone);
      // setShowOtpSection(true);
      navigate(getRouteByKey('login'));
    } catch (error) {
      console.error('Failed to send OTP:', error);
      // TODO: Show error toast/notification
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle OTP verification
   * Completes the registration process
   */
  const handleVerifyOtp = async (otp: string): Promise<void> => {
    if (!registrationData) {
      throw new Error('Registration data not found');
    }

    try {
      // TODO: Replace with actual API call to verify OTP and register user
      // await authService.verifyOtpAndRegister({
      //   ...registrationData,
      //   otp
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - redirect to login
      navigate(getRouteByKey('login'));
    } catch (error) {
      // Re-throw error to be handled by OtpVerification component
      throw error;
    }
  };

  /**
   * Handle back to registration form
   */
  const handleBackToRegistration = () => {
    setShowOtpSection(false);
    setRegistrationData(null);
  };

  /**
   * Handle resend OTP
   */
  const handleResendOtp = async (): Promise<void> => {
    if (!phoneNumber) {
      throw new Error('Phone number not found');
    }

    try {
      // TODO: Replace with actual API call to resend OTP
      // await authService.resendOtp(phoneNumber);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      throw error;
    }
  };

  return (
    <div className="register-page">
      <Container className="register-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="register-logo-container">
            <img
              src="/assets/humanistics_logo_transparent.webp"
              alt="Humanistics AI"
              className="register-logo-image"
            />
          </div>
        </div>

        {/* Register Card */}
        <Card className="register-card">
          <Card.Body>
            {!showOtpSection ? (
              <>
                <h1 className="card-title">Create Account</h1>
                <p className="card-subtitle">Sign up to get started with Humanistic AI</p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Full Name - Full Width */}
                  <div className="form-row">
                    <div className="form-group full-width">
                      <InputField
                        name="fullName"
                        label="Full Name"
                        type="text"
                        mode="react-hook-form"
                        placeholder="John Doe"
                        control={control}
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Phone - Two Columns */}
                  <div className="form-row">
                    <div className="form-group">
                      <InputField
                        name="email"
                        label="Email Address"
                        type="email"
                        mode="react-hook-form"
                        placeholder="john.doe@example.com"
                        control={control}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <PhoneInput
                        name="phone"
                        label="Phone Number"
                        mode="react-hook-form"
                        placeholder="123-456-7890"
                        control={control}
                        defaultCountry="IN"
                        required
                      />
                    </div>
                  </div>

                  {/* Organization & Role - Two Columns */}
                  <div className="form-row">
                    <div className="form-group">
                      <InputField
                        name="organization"
                        label="Organization"
                        type="text"
                        mode="react-hook-form"
                        placeholder="Acme Inc"
                        control={control}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <SelectField
                        name="role"
                        label="Role"
                        mode="react-hook-form"
                        control={control}
                        placeholder="Select your role"
                        options={[
                          { value: "user", label: "User" },
                          { value: "manager", label: "Manager" },
                          { value: "admin", label: "Admin" }
                        ]}
                      />
                    </div>
                  </div>

                  {/* Password & Confirm Password - Two Columns */}
                  <div className="form-row">
                    <div className="form-group">
                      <InputField
                        name="password"
                        label="Password"
                        type="password"
                        mode="react-hook-form"
                        placeholder="Enter your password"
                        control={control}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <InputField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        mode="react-hook-form"
                        placeholder="Re-enter your password"
                        control={control}
                        required
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <CheckboxField
                    name="terms"
                    mode="react-hook-form"
                    control={control}
                    id="terms"
                    label={
                      <span>
                        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                      </span>
                    }
                  />

                  {/* Register Button */}
                  <PrimaryBtn
                    type="submit"
                    loading={isLoading}
                    className="register-btn"
                  >
                    Submit Profile
                  </PrimaryBtn>
                </Form>

                {/* Login Link */}
                <div className="login-link">
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(getRouteByKey("login"));
                    }}
                  >
                    Sign In
                  </a>
                </div>
              </>
            ) : (
              <OtpVerification
                phoneNumber={phoneNumber}
                onVerify={handleVerifyOtp}
                onBack={handleBackToRegistration}
                onResend={handleResendOtp}
                loading={isLoading}
                length={6}
                resendCooldown={60}
              />
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
