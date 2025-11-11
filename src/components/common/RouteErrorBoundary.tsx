import React, { Component, ErrorInfo, ReactNode } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { logger } from '@utils/logger'
import '@styles/components/error-boundary.scss'

interface Props {
  children: ReactNode
  routeName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Route-level Error Boundary Component
 * Provides granular error handling for individual routes without breaking the entire app
 * 
 * @example
 * <RouteErrorBoundary routeName="Dashboard">
 *   <DashboardComponent />
 * </RouteErrorBoundary>
 */
class RouteErrorBoundaryClass extends Component<Props & { navigate: NavigateFunction }, State> {
  constructor(props: Props & { navigate: NavigateFunction }) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error(`Route Error (${this.props.routeName || 'Unknown'})`, { error, errorInfo })
    
    // Log to error reporting service if needed
    // Example: logErrorToService(error, errorInfo, { route: this.props.routeName })
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    })
  }

  handleGoBack = (): void => {
    this.props.navigate(-1)
  }

  handleGoHome = (): void => {
    this.props.navigate('/')
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h1 className="error-title">Something went wrong</h1>
            <p className="error-message">
              {this.props.routeName 
                ? `There was an error loading the ${this.props.routeName} page.`
                : 'There was an error loading this page.'}
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-stack">
                  <strong>Error:</strong> {this.state.error.toString()}
                  <br /><br />
                  <strong>Stack:</strong>
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="error-actions">
              <button 
                className="error-button error-button-primary"
                onClick={this.handleReset}
              >
                Try Again
              </button>
              <button 
                className="error-button error-button-secondary"
                onClick={this.handleGoBack}
              >
                Go Back
              </button>
              <button 
                className="error-button error-button-secondary"
                onClick={this.handleGoHome}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Wrapper component to inject navigate function from hooks
 */
const RouteErrorBoundary: React.FC<Props> = ({ children, routeName }) => {
  const navigate = useNavigate()
  
  return (
    <RouteErrorBoundaryClass navigate={navigate} routeName={routeName}>
      {children}
    </RouteErrorBoundaryClass>
  )
}

export default RouteErrorBoundary
