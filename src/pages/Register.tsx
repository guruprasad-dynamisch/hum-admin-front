import React, { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import "@styles/pages/Register.css";
import StepOne from "@components/registrationSteps/StepOne";
import StepTwo from "@components/registrationSteps/StepTwo";
import StepThree from "@components/registrationSteps/StepThree";
import Logo from "@components/brand/Logo";
import TestimonialCarousel from "@components/TestimonialCarousel";
import testimonials from "@data/testimonials.json"
import { getRouteByKey } from "@utils/helpers";
import { useNavigate } from "react-router-dom";
import { PhoneVerificationResponse, RegisterProfileResponse } from "@constants/form-fields";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [phoneVerificationToken, setPhoneVerificationToken] = useState("");

  const handleNext = useCallback((phoneNumber: string) => {
    setPhone(phoneNumber);
    setStep(2);
  }, []);

  const handleVerify = useCallback((data: PhoneVerificationResponse) => {
    setPhoneVerificationToken(data?.phoneVerificationToken || "");
    setStep(3);
  }, []);

  const handleSubmit = useCallback((data: RegisterProfileResponse) => {
    navigate(getRouteByKey('login'));
  }, [navigate]);

  return (
    <Box className="signup-container" sx={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap' }}>
      <Box
        className="signup-left-panel"
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: { xs: '0 0 0', md: '1 1 50%' },
          minWidth: { xs: '0', md: '50%' },
          alignItems: 'stretch',
          overflow: 'hidden'
        }}
      >
        <Box className="signup-overlay" sx={{ width: '100%' }}>
          <Typography variant="h4" className="signup-hero-title" gutterBottom>
            Helping leaders <br />
            see clearly and act wisely.
          </Typography>
          <TestimonialCarousel testimonials={testimonials} />
        </Box>
      </Box>

      {/* Right side with form */}
      <Box
        className="signup-right-panel"
        sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' }, minWidth: { xs: '100%', md: '50%' }, height: '100vh', display: 'flex', alignItems: 'stretch' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "85%" }}>
            {step === 1 && <StepOne onNext={handleNext} />}
            {step === 2 && <StepTwo phone={phone} onVerify={handleVerify} />}
            {step === 3 && <StepThree phone={phone} phoneVerificationToken={phoneVerificationToken} onSubmit={handleSubmit} />}
          </Box>
          <Box sx={{ mt: 4, height: "15%" }}>
            <Logo />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
