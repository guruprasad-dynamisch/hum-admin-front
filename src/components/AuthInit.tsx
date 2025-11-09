import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../redux/store";
import { setAuthState, clearAuthState } from "../redux/slices/authSlice";
import SplashScreen from "./SplashScreen";
import { userInfoRequest } from "../api/auth";
import { Role } from "../constants/roles";
import { isRememberMeSessionValid, clearAuthData } from "@utils/auth";
import { logoutUser } from "@redux/thunks";

import { AuthInitProps } from '@models/auth.types';

// Configuration for splash screen
const SPLASH_DURATION = 2000; // 2 seconds

const AuthInit: React.FC<AuthInitProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const hasInitialized = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    let splashTimer: NodeJS.Timeout;

    const initializeAuth = async () => {
      // Prevent double initialization in React.StrictMode
      if (hasInitialized.current) {
        setIsInitializing(false);
        return;
      }
      hasInitialized.current = true;

      // Set up splash screen timer
      splashTimer = setTimeout(() => {
        if (isMountedRef.current) {
          setShowSplash(false);
        }
      }, SPLASH_DURATION);

      // Check remember me session validity before making API call
      if (!isRememberMeSessionValid()) {
        console.log('Remember me session expired or not found, logging out');
        if (isMountedRef.current) {
          // Clear auth data and state
          clearAuthData();
          dispatch(clearAuthState());
          // Call logout to clear backend session
          await dispatch(logoutUser());
          setIsInitializing(false);
        }
        return;
      }

      try {
        const response = await userInfoRequest();
        if (response.data.success && response.data.data) {
          if (isMountedRef.current) {
            // Transform API response to User type
            const userData = response.data.data;
            dispatch(setAuthState({
              user: {
                id: userData.id,
                fullName: userData.fullName,
                email: userData.email,
                isActive: userData.isActive,
                role: userData.role as Role, // Convert string to Role enum
                // Optional fields
                organizationId: userData.organizationId,
                phone: userData.phone,
                phoneVerified: userData.phoneVerified,
                lastLogin: userData.lastLogin,
                passwordChangedAt: userData.passwordChangedAt,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
                organization: userData.organization,
              }
            }));
          }
        } else {
          if (isMountedRef.current) {
            dispatch(clearAuthState());
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (isMountedRef.current) {
          dispatch(clearAuthState());
        }
      } finally {
        if (isMountedRef.current) {
          setIsInitializing(false);
        }
      }
    };

    initializeAuth();

    return () => {
      if (!hasInitialized.current) {
        isMountedRef.current = false;
        clearTimeout(splashTimer);
      }
    };
  }, [dispatch]);

  if (showSplash) {
    return (
      <SplashScreen
        duration={SPLASH_DURATION}
        logoWidth="220px"
        pulseSpeed={2.5}
      />
    );
  }

  return <>{children}</>;
};

export default AuthInit;
