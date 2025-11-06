import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Card, Form } from "react-bootstrap";
import { InputField, PhoneInput, SelectField, CheckboxField } from "@components/fields";
import PrimaryBtn from "@components/buttons/PrimaryBtn";
import "@styles/pages/register.scss";
import { getRouteByKey } from "@utils/helpers";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Registration Form Schema
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  organization: z.string().min(1, "Organization is required"),
  role: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      role: "user",
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    setPhoneNumber(data.phone);
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpSection(true);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpValues.join('');
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false);
        navigate(getRouteByKey('login'));
      }, 1500);
    }
  };

  const handleBackToRegistration = () => {
    setShowOtpSection(false);
    setOtpValues(["", "", "", "", "", ""]);
  };

  return (
    <div className="register-page">
      <Container className="register-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">🤖</div>
          <div className="logo-text">Humanistic AI</div>
        </div>

        {/* Register Card */}
        <Card className="register-card">
          <Card.Body>
            {!showOtpSection ? (
              <>
                <h1 className="card-title">Create Account</h1>
                <p className="card-subtitle">Sign up to get started with Humanistic AI</p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* First Name */}
                  <div className="form-group">
                    <InputField
                      name="firstName"
                      label="First Name"
                      type="text"
                      mode="react-hook-form"
                      placeholder="John"
                      control={control}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="form-group">
                    <InputField
                      name="lastName"
                      label="Last Name"
                      type="text"
                      mode="react-hook-form"
                      placeholder="Doe"
                      control={control}
                      required
                    />
                  </div>

                  {/* Email */}
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

                  {/* Phone Number */}
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
                    <div className="helper-text">We'll send you a verification code via SMS</div>
                  </div>

                  {/* Organization */}
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

                  {/* Role */}
                  <div className="form-group">
                    <SelectField
                      name="role"
                      label="Role"
                      mode="react-hook-form"
                      control={control}
                      options={[
                        { value: "user", label: "User" },
                        { value: "admin", label: "Admin" }
                      ]}
                    />
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
                    Send Verification Code
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
              <div className="otp-section active">
                <h1 className="card-title">Verify Phone Number</h1>
                <p className="card-subtitle">
                  Enter the 6-digit code sent to {phoneNumber}
                </p>

                {/* OTP Inputs */}
                <div className="otp-inputs">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className="otp-input"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </div>

                {/* Verify Button */}
                <PrimaryBtn
                  type="button"
                  loading={isLoading}
                  className="register-btn"
                  onClick={handleVerifyOtp}
                  disabled={otpValues.join('').length !== 6}
                >
                  Verify & Complete Registration
                </PrimaryBtn>

                {/* Resend Link */}
                <div className="resend-link">
                  Didn't receive code?{" "}
                  <button type="button">Resend Code</button>
                </div>

                {/* Back Button */}
                <PrimaryBtn
                  type="button"
                  className="register-btn btn-secondary"
                  onClick={handleBackToRegistration}
                >
                  Back to Registration
                </PrimaryBtn>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
