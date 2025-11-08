import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuthLoading, setAuthState, clearAuthState } from "../redux/slices/authSlice";
import PageLoader from "../components/PageLoader";
import { userInfoRequest } from "../api/auth";
import { Role } from "../constants/roles";

import { AuthInitProps } from '@models/auth.types';

const AuthInit: React.FC<AuthInitProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const [isInitializing, setIsInitializing] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    let isMounted = true;

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
          if (isMounted) {
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
          if (isMounted) {
            dispatch(clearAuthState());
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (isMounted) {
          dispatch(clearAuthState());
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isInitializing || isLoading) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthInit;
