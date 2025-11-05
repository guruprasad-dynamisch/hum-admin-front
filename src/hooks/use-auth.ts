import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@redux/store';
import { clearError } from '@redux/slices/authSlice';
import { loginUser } from '@redux/thunks';
import { getRouteByKey } from '@utils/helpers';
import { useToast } from './use-toast';
import { logoutUser } from '@redux/thunks';
import { SOMETHING_WENT_WRONG } from '@constants/message-constants';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation() as any;
    const { showError, showSuccess } = useToast();

    const handleLogin = useCallback(async (identifier: string, password: string, rememberMe: boolean = false, to?: string | null) => {
        try {
            const result = await dispatch(loginUser({
                identifier,
                password,
                rememberMe
            }));

            if (loginUser.fulfilled.match(result)) {
                showSuccess('Login successful')
                const toPath = to || location.state?.from?.pathname || getRouteByKey('discoveries')
                // Brief delay to allow user to see success message
                setTimeout(() => {
                    navigate(toPath, { replace: true })
                }, 500);
            } else if (loginUser.rejected.match(result)) {
                // Show toast error when login is rejected
                const errorMessage = result.payload?.message || SOMETHING_WENT_WRONG;
                showError(errorMessage);
            }
        } catch (error: any) {
            showError(error?.message || SOMETHING_WENT_WRONG);
        }
    }, [dispatch, navigate, location, showError, showSuccess]);

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logoutUser());
            showSuccess('Logout successful');
            // Navigate to login
            navigate(getRouteByKey('login'), { replace: true });
        } catch (error: any) {
            showError(error?.message || SOMETHING_WENT_WRONG);
            console.error('Logout error:', error);
        }
    }, [dispatch, navigate, showError, showSuccess]);

    return { handleLogin, handleLogout };
};