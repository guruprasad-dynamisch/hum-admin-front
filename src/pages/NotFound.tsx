import { useNavigate } from 'react-router-dom'
import { getRouteByKey } from '@utils/helpers'
import '@styles/pages/not-found.scss'
import { PrimaryBtn, SecondaryBtn } from '@components/buttons'
import { useAppSelector } from '@redux/store'
import { selectIsAuthenticated } from '@redux/slices/authSlice'

export default function NotFound() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* 404 Illustration */}
        <div className="not-found-illustration">
          <h1 className="not-found-404">404</h1>
          <div className="not-found-icon">🔍</div>
        </div>

        {/* Error Message */}
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-description">
          The page you are looking for doesn't exist or you don't have permission to access it.
          It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="not-found-actions">
          <PrimaryBtn fullWidth={false} onClick={() => navigate(isAuthenticated ? getRouteByKey('dashboard') : getRouteByKey('login'))}>
            🏠 Go to Dashboard
          </PrimaryBtn>
          <SecondaryBtn onClick={() => navigate(-1)}>
            ← Go Back
          </SecondaryBtn>
        </div>
      </div>
    </div>
  )
}
