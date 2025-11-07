import '@styles/components/audit-timeline-item.scss'

export type AuditActionType = 'create' | 'update' | 'delete' | 'login'

export interface AuditLog {
  id: number | string;
  type: AuditActionType;
  user: string;
  action: string;
  module: string;
  details: string;
  time: string;
  ip: string;
  data?: any;
}

interface AuditTimelineItemProps {
  log: AuditLog;
  isExpanded: boolean;
  onToggle: () => void;
}

const getIcon = (type: AuditActionType): string => {
  const icons = {
    create: '✓',
    update: '✎',
    delete: '✗',
    login: '🔑'
  }
  return icons[type] || '•'
}

// Compact Grid Design - Shows only heading initially
const AuditTimelineItem = ({ log, isExpanded, onToggle }: AuditTimelineItemProps) => {
  return (
    <div className={`audit-timeline-item-compact ${isExpanded ? 'expanded' : ''}`}>
      <div className="compact-header" onClick={onToggle}>
        <div className={`compact-icon ${log.type}`}>
          {getIcon(log.type)}
        </div>
        
        <div className="compact-content">
          <div className="compact-title-row">
            <div className="compact-title">{log.action}</div>
            <div className="compact-time">{log.time}</div>
          </div>
        </div>

        <span className="compact-expand-icon">{isExpanded ? '−' : '+'}</span>
      </div>

      {isExpanded && (
        <div className="compact-expanded-content">
          <div className="compact-details">
            <div className="detail-text">
              <span className={`meta-badge ${log.type}`}>{log.type}</span>
              {log.details}
            </div>
          </div>
          
          <div className="compact-meta">
            <span className="meta-label">👤</span>
            <span className="meta-value-audit">{log.user}</span>
            <span className="meta-separator">•</span>
            <span className="meta-label">📦</span>
            <span className="meta-value-audit">{log.module}</span>
            <span className="meta-separator">•</span>
            <span className="meta-label">🌐</span>
            <span className="meta-value-audit">{log.ip}</span>
          </div>

          {log.data && (
            <div className="compact-data-section">
              <div className="data-title">Event Data</div>
              <pre className="data-json">{JSON.stringify(log.data, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AuditTimelineItem
