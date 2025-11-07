import { Column, Row } from 'react-table'
import { Template } from '@constants/mock-templates'
import BadgeCell from '@components/tables/cells/BadgeCell'
import ActionCell from '@components/tables/cells/ActionCell'

interface ColumnHandlers {
  onUse?: (template: Template) => void
  onEdit?: (template: Template) => void
  onDelete?: (template: Template) => void
}

export const getTemplateColumns = (handlers?: ColumnHandlers): Column<Template>[] => [
  {
    Header: 'Template Name',
    accessor: 'name',
    Cell: ({ row }: { row: Row<Template> }) => (
      <div className="template-name-cell">
        <span className="template-icon">{row.original.icon}</span>
        <div>
          <div className="template-name">{row.original.name}</div>
          <div className="template-description">{row.original.description}</div>
        </div>
      </div>
    )
  },
  {
    Header: 'Department',
    accessor: 'department',
    Cell: ({ value }: { value: string }) => <BadgeCell value={value} variant={value.toLowerCase()} />
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }: { value: string[] }) => (
      <div className="tags-cell">
        {value.map((tag: string, index: number) => (
          <BadgeCell key={index} value={tag} variant="tag" />
        ))}
      </div>
    )
  },
  {
    Header: 'Actions',
    id: 'actions',
    Cell: ({ row }: { row: Row<Template> }) => (
      <ActionCell
        row={row.original}
        onEdit={handlers?.onEdit}
        onDelete={handlers?.onDelete}
        customActions={[
          {
            icon: '▶',
            onClick: (template) => handlers?.onUse?.(template),
            title: 'Use template',
            className: 'action-btn-use'
          }
        ]}
      />
    )
  }
]
