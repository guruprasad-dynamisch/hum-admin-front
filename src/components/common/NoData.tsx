import React from 'react'
import '@styles/components/no-data.scss'

interface NoDataProps {
  title?: string
  description?: string
  image?: string
  className?: string
  style?: React.CSSProperties
  showImage?: boolean
}

const NoData: React.FC<NoDataProps> = ({ 
  title, 
  description, 
  image, 
  className = '', 
  style = {}, 
  showImage = true 
}) => {
  return (
    <div className={`no-data-wrap ${className}`} style={style}>
      {showImage && (
        <div className="no-data-image">
          {image ? (
            <img src={image} alt="No data" />
          ) : (
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="50" fill="#f0f0f0" />
              <path 
                d="M40 50h40M40 60h40M40 70h25" 
                stroke="#ccc" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <circle cx="85" cy="85" r="20" fill="#e0e0e0" />
              <path 
                d="M85 75v20M75 85h20" 
                stroke="#999" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      )}
      {title && <h4 className="no-data-title">{title}</h4>}
      {description && <p className="no-data-description">{description}</p>}
    </div>
  )
}

export default NoData
