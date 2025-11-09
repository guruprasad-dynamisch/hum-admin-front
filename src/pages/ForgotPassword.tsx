import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Card, Form } from "react-bootstrap";
import { InputField } from "@components/fields";
import PrimaryBtn from "@components/buttons/PrimaryBtn";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@validations/password-validations";
import "@styles/pages/forgot-password.scss";
import { getRouteByKey } from "@utils/helpers";
import { NavLink } from "react-router-dom";
import Logo from "@components/common/Logo";

/**
 * Forgot Password Page Component
 * 
 * Allows users to request a password reset link via email
 */
const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { control, handleSubmit, formState: { errors }, getValues, } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: "",
    },
  });

  /**
   * Handle forgot password form submission
   */
  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to send reset email
      // await authService.sendPasswordResetEmail(data.email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setEmailSent(true);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      // TODO: Show error toast/notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <Container className="forgot-password-container">
        {/* Logo Section */}
        <Logo containerClassName='logo-section' wrapperClassName='forgot-password-logo-container' className='forgot-password-logo-image' />

        {/* Forgot Password Card */}
        <Card className="forgot-password-card">
          <Card.Body>
            {!emailSent ? (
              <>
                <h1 className="card-title">Forgot Password?</h1>
                <p className="card-subtitle">
                  Enter your email address and we'll send you a link to reset your password
                </p>

                <Form onSubmit={handleSubmit(onSubmit)}>
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

                  {/* Submit Button */}
                  <PrimaryBtn
                    type="submit"
                    loading={isLoading}
                    className="submit-btn"
                  >
                    Send Reset Link
                  </PrimaryBtn>
                </Form>

                {/* Back to Login Link */}
                <div className="back-link">
                  <NavLink to={getRouteByKey("login")}>← Back to Login</NavLink>
                </div>
              </>
            ) : (
              <>
                <div className="success-icon">✓</div>
                <h1 className="card-title">Check Your Email</h1>
                <p className="card-subtitle">
                  We've sent a password reset link to <strong>{getValues('email')}</strong>
                </p>
                <p className="card-subtitle">
                  Please check your inbox and click the link to reset your password.
                </p>

                {/* Resend Link */}
                <div className="resend-section">
                  <p>Didn't receive the email?</p>
                  <button
                    type="button"
                    onClick={() => setEmailSent(false)}
                    className="resend-btn"
                  >
                    Try again
                  </button>
                </div>

                {/* Back to Login Link */}
                <div className="back-link">
                  <NavLink to={getRouteByKey("login")}>← Back to Login</NavLink>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;
