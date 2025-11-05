import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectAuthLoading,
  setAuthState,
  clearAuthState,
} from "../redux/slices/authSlice";
import { getUser } from "../utils/auth";
import PageLoader from "../components/PageLoader";

interface AuthInitProps {
  children: React.ReactNode;
}

/**
 * AuthInit Component
 *
 * SECURITY: Tokens are stored in httpOnly cookies by the backend.
 * We only check for user profile data in localStorage/sessionStorage.
 * Actual authentication is validated server-side on each API request.
 */
const AuthInit: React.FC<AuthInitProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = () => {
      try {
        // Check for user profile data in localStorage/sessionStorage
        // Tokens are in httpOnly cookies and automatically sent with requests
        const user = getUser();

        if (user) {
          // Set auth state from stored user data
          // Backend will validate the httpOnly cookie tokens on API requests
          if (isMounted) {
            dispatch(setAuthState({ user }));
          }
        } else {
          // No user data found, ensure clean state
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

    // initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // // Show loading while initializing auth state
  // if (isInitializing || isLoading) {
  //   return <PageLoader />;
  // }

  return <>{children}</>;
};

export default AuthInit;
