import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuthLoading, setAuthState, clearAuthState } from "../redux/slices/authSlice";
import PageLoader from "../components/PageLoader";
import { userInfoRequest } from "../api/auth";
import { Role } from "../constants/roles";

interface AuthInitProps {
  children: React.ReactNode;
}

const AuthInit: React.FC<AuthInitProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
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
