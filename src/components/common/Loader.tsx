import React from 'react'
import '@styles/components/loader.scss'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  className = '',
  text = 'Loading...'
}) => {
  return (
    <div className={`loader-container ${className}`}>
      <div className={`loader-spinner loader-${size}`}>
        <div className="spinner"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  )
}

export default Loader
