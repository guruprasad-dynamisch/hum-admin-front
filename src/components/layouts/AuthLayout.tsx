import React from "react";
import { Box, Typography, Grid } from "@mui/material";
// import Logo from "@components/brand/Logo";
import "@styles/pages/Login.css";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  showBackLink?: boolean;
}

/**
 * Shared layout component for authentication pages (Login, ForgotPassword, ResetPassword)
 * Provides consistent structure with left testimonial panel and right form panel
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  children,
  showBackLink = false,
}) => {
  return (
    <Grid container className="login-container">
      {/* Left Panel - Testimonials */}
      <Grid
        item
        xs={0}
        md={6}
        className="login-left-panel"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Box className="login-overlay">
          <Typography variant="h4" className="login-hero-title">
            Helping leaders <br />
            see clearly and act wisely.
          </Typography>
        </Box>
      </Grid>

      {/* Right Panel - Form Content */}
      <Grid
        item
        xs={12}
        md={6}
        className="login-right-panel"
        sx={{ height: "100vh", display: "flex", alignItems: "stretch" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              paddingTop: "20px",
            }}
          >
            <Box className="login-form-container">
              <Typography
                variant="h5"
                className="login-form-title"
                align="center"
              >
                {title}
              </Typography>
              {children}
            </Box>
          </Box>
          <Box sx={{ mt: 4, height: "15%", textAlign: "center" }}>
            {/* <Logo /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
