import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../redux/store";
import { setAuthState, clearAuthState } from "../redux/slices/authSlice";
import SplashScreen from "./SplashScreen";
import { userInfoRequest } from "../api/auth";
import { Role } from "../constants/roles";
import { getUser, clearAuthData } from "@utils/auth";

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

      // Try to restore user from storage first
      const storedUser = getUser();
      
      if (!storedUser) {
        // No user in storage, clear everything and finish initialization
        console.log('No user found in storage');
        if (isMountedRef.current) {
          clearAuthData();
          dispatch(clearAuthState());
          setIsInitializing(false);
        }
        return;
      }

      // User found in storage, restore to Redux state
      console.log('User found in storage, restoring session');
      if (isMountedRef.current) {
        dispatch(setAuthState({ user: storedUser }));
      }

      // Validate session with backend by fetching fresh user info
      try {
        const response = await userInfoRequest();
        if (response.data.success && response.data.data) {
          if (isMountedRef.current) {
            // Update Redux state with fresh data from backend
            const userData = response.data.data;
            dispatch(setAuthState({
              user: {
                id: userData.id,
                fullName: userData.fullName,
                email: userData.email,
                isActive: userData.isActive,
                role: userData.role as Role,
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
          // Backend validation failed, clear everything
          console.log('Backend validation failed');
          if (isMountedRef.current) {
            clearAuthData();
            dispatch(clearAuthState());
          }
        }
      } catch (error) {
        // Backend validation error (e.g., 401), clear everything
        console.error("Auth validation error:", error);
        if (isMountedRef.current) {
          clearAuthData();
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
