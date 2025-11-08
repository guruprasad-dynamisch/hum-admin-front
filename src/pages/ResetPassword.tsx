import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Card, Form } from "react-bootstrap";
import { InputField } from "@components/fields";
import PrimaryBtn from "@components/buttons/PrimaryBtn";
import { resetPasswordSchema, ResetPasswordFormData } from "@validations/password-validations";
import "@styles/pages/reset-password.scss";
import { getRouteByKey } from "@utils/helpers";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * Reset Password Page Component
 * 
 * Allows users to set a new password using a reset token from email
 */
const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Get token from URL query params
  const token = searchParams.get('token');

  const { control, handleSubmit, formState: { errors }, } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Handle reset password form submission
   */
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    if (!token) {
      console.error('Reset token is missing');
      // TODO: Show error toast/notification
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to reset password
      // await authService.resetPassword(token, data.password);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setResetSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate(getRouteByKey('login'));
      }, 3000);
    } catch (error) {
      console.error('Failed to reset password:', error);
      // TODO: Show error toast/notification
    } finally {
      setIsLoading(false);
    }
  };

  // Show error if token is missing
  if (!token) {
    return (
      <div className="reset-password-page">
        <Container className="reset-password-container">
          <div className="logo-section">
            <div className="reset-password-logo-container">
              <img
                src="/assets/humanistics_logo_transparent.webp"
                alt="Humanistics AI"
                className="reset-password-logo-image"
              />
            </div>
          </div>

          <Card className="reset-password-card">
            <Card.Body>
              <div className="error-icon">✕</div>
              <h1 className="card-title">Invalid Reset Link</h1>
              <p className="card-subtitle">
                This password reset link is invalid or has expired.
              </p>
              <p className="card-subtitle">
                Please request a new password reset link.
              </p>

              <PrimaryBtn
                type="button"
                className="submit-btn"
                onClick={() => navigate(getRouteByKey('forgotPassword'))}
              >
                Request New Link
              </PrimaryBtn>

              <div className="back-link">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(getRouteByKey("login"));
                  }}
                >
                  ← Back to Login
                </a>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <Container className="reset-password-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="reset-password-logo-container">
            <img
              src="/assets/humanistics_logo_transparent.webp"
              alt="Humanistics AI"
              className="reset-password-logo-image"
            />
          </div>
        </div>

        {/* Reset Password Card */}
        <Card className="reset-password-card">
          <Card.Body>
            {!resetSuccess ? (
              <>
                <h1 className="card-title">Reset Password</h1>
                <p className="card-subtitle">
                  Enter your new password below
                </p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Password */}
                  <div className="form-group">
                    <InputField
                      name="password"
                      label="New Password"
                      type="password"
                      mode="react-hook-form"
                      placeholder="Enter your new password"
                      control={control}
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="form-group">
                    <InputField
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      mode="react-hook-form"
                      placeholder="Re-enter your new password"
                      control={control}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <PrimaryBtn
                    type="submit"
                    loading={isLoading}
                    className="submit-btn"
                  >
                    Reset Password
                  </PrimaryBtn>
                </Form>

                {/* Back to Login Link */}
                <div className="back-link">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(getRouteByKey("login"));
                    }}
                  >
                    ← Back to Login
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="success-icon">✓</div>
                <h1 className="card-title">Password Reset Successful!</h1>
                <p className="card-subtitle">
                  Your password has been successfully reset.
                </p>
                <p className="card-subtitle">
                  You will be redirected to the login page in a few seconds...
                </p>

                <PrimaryBtn
                  type="button"
                  className="submit-btn"
                  onClick={() => navigate(getRouteByKey('login'))}
                >
                  Go to Login
                </PrimaryBtn>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResetPassword;
