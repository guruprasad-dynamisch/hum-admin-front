import React from 'react'
import Modal from '@components/common/Modal'
import DynamicForm, { FieldConfig } from '@components/forms/DynamicForm'
import { templateSchema, TemplateFormData, templateDefaultValues } from '@validations/template-validations'
import { Template } from '@constants/mock-templates'

export interface TemplateModalProps {
  /** Show/hide modal */
  show: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Template data for edit mode (optional) */
  template?: Template | null
  /** Callback when form is submitted */
  onSubmit: (data: TemplateFormData) => void | Promise<void>
  /** Loading state */
  loading?: boolean
}

/**
 * Template Modal Component
 * 
 * Uses DynamicForm with react-hook-form and zod validation
 * 
 * @example
 * <TemplateModal
 *   show={showModal}
 *   onClose={() => setShowModal(false)}
 *   template={selectedTemplate}
 *   onSubmit={handleSubmitTemplate}
 * />
 */
const TemplateModal: React.FC<TemplateModalProps> = ({
  show,
  onClose,
  template,
  onSubmit,
  loading = false
}) => {
  const isEditMode = !!template

  // Field configuration for DynamicForm
  const fields: FieldConfig[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Template Name',
      placeholder: 'Enter template name',
      required: true,
      colSpan: 12
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter template description',
      required: true,
      rows: 3,
      colSpan: 12
    },
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      placeholder: 'Select department',
      required: true,
      options: [
        { label: 'Sales', value: 'Sales' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Support', value: 'Support' },
        { label: 'Product', value: 'Product' },
        { label: 'Engineering', value: 'Engineering' }
      ],
      colSpan: 12
    },
    {
      name: 'tags',
      type: 'text',
      label: 'Tags',
      placeholder: 'Enter tags separated by commas',
      required: true,
      helperText: 'Separate tags with commas (e.g., email, marketing, sales)',
      colSpan: 12
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Template Content',
      placeholder: 'Enter your template content here...',
      required: true,
      rows: 8,
      colSpan: 12
    }
  ]

  // Prepare default values from template data
  const defaultValues: Partial<TemplateFormData> = template
    ? {
        name: template.name,
        description: template.description,
        department: template.department as TemplateFormData['department'],
        tags: template.tags.join(', '),
        content: ''
      }
    : templateDefaultValues

  const handleSubmit = async (data: TemplateFormData) => {
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.error('Error submitting template form:', error)
      // Error handling can be added here (e.g., show toast notification)
    }
  }

  return (
    <Modal
      show={show}
      onHide={onClose}
      title={isEditMode ? 'Edit Template' : 'Create New Template'}
      size="xl"
      centered
      backdrop="static"
      keyboard={!loading}
      className='template-modal'
      dialogClassName='template-modal-dialog'
    >
      <DynamicForm
        mode="react-hook-form"
        fields={fields}
        schema={templateSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        layout="grid"
        gridColumns={12}
        fieldSpacing={3}
        submitButtonText={isEditMode ? 'Update Template' : 'Create Template'}
        showSubmitButton
        submitButtonSize="medium"
        cancelButtonText="Cancel"
        showCancelButton
        onCancel={onClose}
        formActionsClassName='template-modal-actions'
      />
    </Modal>
  )
}

export default TemplateModal
export type { TemplateFormData }
