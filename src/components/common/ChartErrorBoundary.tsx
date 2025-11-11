import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ChartErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Chart rendering error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="chart-error-fallback">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <div className="error-message">
              <h4>Chart Error</h4>
              <p>Unable to render chart. Please try refreshing the page.</p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="error-details">
                  <summary>Error Details</summary>
                  <pre>{this.state.error.message}</pre>
                </details>
              )}
            </div>
            <button 
              className="retry-btn"
              onClick={() => this.setState({ hasError: false, error: undefined })}
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ChartErrorBoundary
