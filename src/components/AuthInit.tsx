import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../redux/store";
import { setAuthState, clearAuthState } from "../redux/slices/authSlice";
import PageLoader from "../components/PageLoader";
import { userInfoRequest } from "../api/auth";
import { Role } from "../constants/roles";

import { AuthInitProps } from '@models/auth.types';

const AuthInit: React.FC<AuthInitProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const hasInitialized = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Prevent double initialization in React.StrictMode
      if (hasInitialized.current) {
        setIsInitializing(false);
        return;
      }
      hasInitialized.current = true;
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
      }
    };
  }, [dispatch]);

  if (isInitializing) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthInit;
