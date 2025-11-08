interface ActionCellProps<T> {
  row: T
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  customActions?: Array<{
    icon: string
    onClick: (row: T) => void
    title: string
    className?: string
  }>
}

export default function ActionCell<T>({
  row,
  onEdit,
  onDelete,
  customActions
}: ActionCellProps<T>) {
  return (
    <div className="action-btns">
      {onEdit && (
        <button
          className="action-btn"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(row)
          }}
          title="Edit"
        >
          ✎
        </button>
      )}

      {onDelete && (
        <button
          className="action-btn action-btn-delete"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(row)
          }}
          title="Delete"
        >
          🗑
        </button>
      )}

      {customActions?.map((action, index) => (
        <button
          key={index}
          className={`action-btn ${action.className || ''}`}
          onClick={(e) => {
            e.stopPropagation()
            action.onClick(row)
          }}
          title={action.title}
        >
          {action.icon}
        </button>
      ))}
    </div>
  )
}
