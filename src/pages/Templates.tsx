import { useMemo, useState } from 'react'
import { Container, Card, ButtonGroup } from 'react-bootstrap'
import PageTopBar from '@components/common/PageTopBar'
import DataTable from '@components/common/DataTable'
import TemplateModal from '@components/modals/TemplateModal'
import BadgeCell from '@components/tables/cells/BadgeCell'
import PrimaryBtn from '@components/buttons/PrimaryBtn'
import SecondaryBtn from '@components/buttons/SecondaryBtn'
import IconBtn from '@components/buttons/IconBtn'
import { useDialogMessages } from '@hooks/useDialog'
import { MOCK_TEMPLATES, Template } from '@constants/mock-templates'
import { DIALOG_MESSAGES } from '@constants/message-constants'
import { getTemplateColumns } from '@config/templates/columnDefinitions'
import { TemplateFormData } from '@validations/template-validations'
import { FiGrid, FiList, FiEdit2, FiTrash2, FiPlus, FiPlay } from 'react-icons/fi'
import '@styles/pages/templates.scss'

type ViewMode = 'grid' | 'list'

export default function Templates() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  // Initialize dialog hook
  const { showConfirmation, showSuccessDialog } = useDialogMessages()

  const handleCreateTemplate = () => {
    setSelectedTemplate(null)
    setShowTemplateModal(true)
  }

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setShowTemplateModal(true)
  }

  const handleUseTemplate = (template: Template) => {
    alert(`Using template: ${template.name}`)
  }

  const handleDeleteClick = async (template: Template) => {
    const confirmed = await showConfirmation(
      DIALOG_MESSAGES.deleteTemplate(template.name),
      {
        title: DIALOG_MESSAGES.deleteTemplateTitle,
        confirmText: DIALOG_MESSAGES.deleteButton,
        cancelText: DIALOG_MESSAGES.cancelButton,
        confirmVariant: 'danger',
        icon: <FiTrash2 />
      }
    )

    if (confirmed) {
      // Delete the template
      setTemplates(prevTemplates =>
        prevTemplates.filter(t => t.id !== template.id)
      )

      // Show success message
      showSuccessDialog(DIALOG_MESSAGES.templateDeletedSuccess(template.name))
    }
  }

  const handleSubmitTemplate = (data: TemplateFormData) => {
    if (selectedTemplate) {
      // Edit existing template
      setTemplates(prevTemplates =>
        prevTemplates.map(t =>
          t.id === selectedTemplate.id
            ? {
              ...t,
              name: data.name,
              description: data.description,
              department: data.department,
              tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
              updatedAt: 'Just now'
            }
            : t
        )
      )
      showSuccessDialog(DIALOG_MESSAGES.templateUpdatedSuccess(data.name))
    } else {
      // Create new template
      const newTemplate: Template = {
        id: Math.max(...templates.map(t => t.id)) + 1,
        name: data.name,
        description: data.description,
        department: data.department,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        icon: '📝',
        uses: 0,
        updatedAt: 'Just now',
        createdAt: new Date().toLocaleDateString('en-CA')
      }
      setTemplates(prevTemplates => [newTemplate, ...prevTemplates])
      showSuccessDialog(DIALOG_MESSAGES.templateCreatedSuccess(data.name))
    }
    setShowTemplateModal(false)
    setSelectedTemplate(null)
  }

  const handleCloseTemplateModal = () => {
    setShowTemplateModal(false)
    setSelectedTemplate(null)
  }

  // Define table columns for list view using config
  const columns = useMemo(
    () => getTemplateColumns({
      onUse: handleUseTemplate,
      onEdit: handleEditTemplate,
      onDelete: handleDeleteClick
    }),
    []
  )

  return (
    <>
      {/* Top Bar with Page Title and Actions */}
      <PageTopBar
        leftContent={
          <div className="page-title">Template Management</div>
        }
        rightContent={
          <div className='d-flex align-items-center gap-2'>
            <PrimaryBtn
              onClick={handleCreateTemplate}
              icon={<FiPlus />}
              fullWidth={false}
            >
              Create Template
            </PrimaryBtn>
          </div>
        }
      />

      {/* Main Content */}
      <div className="templates-page">
        <Container fluid>
          {/* View Toggle - List View First */}
          <div className="view-controls">
            <ButtonGroup aria-label="View mode toggle">
              <SecondaryBtn
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'active' : ''}
                icon={<FiList />}
                fullWidth={false}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                List View
              </SecondaryBtn>
              <SecondaryBtn
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'active' : ''}
                icon={<FiGrid />}
                fullWidth={false}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                Grid View
              </SecondaryBtn>
            </ButtonGroup>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <div className="template-list">
              <DataTable
                columns={columns}
                data={templates}
                pageSize={10}
              />
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="template-grid">
              {templates.map((template) => (
                <Card key={template.id} className="template-card">
                  <Card.Body>
                    <div className="template-card-icon">{template.icon}</div>
                    <Card.Title className="template-card-title">
                      {template.name}
                    </Card.Title>
                    <Card.Text className="template-card-description">
                      {template.description}
                    </Card.Text>

                    <div className="template-card-tags">
                      {template.tags.map((tag, index) => (
                        <BadgeCell key={index} value={tag} variant="tag" />
                      ))}
                    </div>

                    <div className="template-card-meta">
                      <div className="meta-item">
                        <span className="meta-icon">👁</span>
                        <span className="meta-text">{template.uses} uses</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">📅</span>
                        <span className="meta-text">{template.updatedAt}</span>
                      </div>
                    </div>

                    <div className="template-card-actions">
                      <IconBtn
                        size="sm"
                        variant="success"
                        onClick={() => handleUseTemplate(template)}
                        title="Use template"
                        aria-label={`Use ${template.name}`}
                      >
                        <FiPlay />
                      </IconBtn>
                      <IconBtn
                        size="sm"
                        variant="primary"
                        onClick={() => handleEditTemplate(template)}
                        title="Edit template"
                        aria-label={`Edit ${template.name}`}
                      >
                        <FiEdit2 />
                      </IconBtn>
                      <IconBtn
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(template)}
                        title="Delete template"
                        aria-label={`Delete ${template.name}`}
                      >
                        <FiTrash2 />
                      </IconBtn>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

        </Container>
      </div>

      {/* Template Create/Edit Modal */}
      <TemplateModal
        show={showTemplateModal}
        onClose={handleCloseTemplateModal}
        onSubmit={handleSubmitTemplate}
        template={selectedTemplate}
      />
    </>
  )
}
