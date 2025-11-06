import '@styles/components/export-section.scss'

interface ExportOption {
  format: string
  icon: string
  label: string
}

interface ExportSectionProps {
  onExport: (format: string) => void
}

const exportOptions: ExportOption[] = [
  { format: 'csv', icon: '📄', label: 'Export as CSV' },
  { format: 'excel', icon: '📊', label: 'Export as Excel' },
  { format: 'json', icon: '📋', label: 'Export as JSON' },
  { format: 'pdf', icon: '📕', label: 'Export as PDF' }
]

export default function ExportSection({ onExport }: ExportSectionProps) {
  return (
    <div className="export-section">
      <h3 className="export-title">Export Options</h3>
      <div className="export-options">
        {exportOptions.map((option) => (
          <div
            key={option.format}
            className="export-card"
            onClick={() => onExport(option.format)}
          >
            <div className="export-icon">{option.icon}</div>
            <div className="export-label">{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
