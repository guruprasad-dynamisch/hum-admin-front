import React from 'react'
import Modal from '@components/common/Modal'
import DynamicForm, { FieldConfig } from '@components/forms/DynamicForm'
import { userSchema, UserFormData, userDefaultValues } from '@validations/user-validations'
import { User } from '@constants/mock-users'

export interface UserModalProps {
  /** Show/hide modal */
  show: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** User data for edit mode (required) */
  user: User
  /** Callback when form is submitted */
  onSubmit: (data: UserFormData) => void | Promise<void>
  /** Loading state */
  loading?: boolean
}

/**
 * Edit User Modal Component
 * 
 * Uses DynamicForm with react-hook-form and zod validation
 * 
 * @example
 * <UserModal
 *   show={showModal}
 *   onClose={() => setShowModal(false)}
 *   user={selectedUser}
 *   onSubmit={handleEditUser}
 * />
 */
const UserModal: React.FC<UserModalProps> = ({
  show,
  onClose,
  user,
  onSubmit,
  loading = false
}) => {
  // Field configuration for DynamicForm
  const fields: FieldConfig[] = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter first name',
      required: true,
      colSpan: 6
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter last name',
      required: true,
      colSpan: 6
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter email address',
      required: true,
      colSpan: 12
    },
    {
      name: 'phone',
      type: 'phone',
      label: 'Phone Number',
      placeholder: 'Enter phone number',
      required: true,
      defaultCountry: 'US',
      colSpan: 12
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      placeholder: 'Select role',
      required: true,
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' }
      ],
      colSpan: 6
    },
    {
      name: 'organization',
      type: 'text',
      label: 'Organization',
      placeholder: 'Enter organization name',
      required: true,
      colSpan: 6
    }
  ]

  // Prepare default values from user data
  const defaultValues: Partial<UserFormData> = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    organization: user.organization,
    status: user.status
  }

  const handleSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.error('Error submitting user form:', error)
      // Error handling can be added here (e.g., show toast notification)
    }
  }

  return (
    <Modal
      show={show}
      onHide={onClose}
      title="Edit User"
      size="lg"
      centered
      backdrop="static"
      keyboard={!loading}
      className='user-modal'
    >
      <DynamicForm
        mode="react-hook-form"
        fields={fields}
        schema={userSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        layout="grid"
        gridColumns={12}
        fieldSpacing={3}
        submitButtonText="Update User"
        showSubmitButton
        submitButtonSize="medium"
        cancelButtonText="Cancel"
        showCancelButton
        onCancel={onClose}
        formActionsClassName='user-modal-actions'
      />
    </Modal>
  )
}

export default UserModal
