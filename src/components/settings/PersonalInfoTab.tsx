import React from 'react'
import { Card } from '@components/common'
import DynamicForm from '@components/forms/DynamicForm'
import { personalInfoSchema, PersonalInfoFormData } from '@validations/profile-validations'
import { FieldConfig } from '@components/forms/types'

export interface PersonalInfoTabProps {
  defaultValues: PersonalInfoFormData
  onSubmit: (data: PersonalInfoFormData) => void
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ defaultValues, onSubmit }) => {
  const fields: FieldConfig[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter first name',
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter last name',
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter email',
      disabled: true,
      helperText: 'Email cannot be changed',
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'phone',
      placeholder: 'Enter phone number',
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    },
    {
      name: 'organization',
      label: 'Organization',
      type: 'text',
      placeholder: 'Enter organization',
      disabled: true,
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text',
      placeholder: 'Enter role',
      disabled: true,
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      colSpan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  ]

  return (
    <Card title="Personal Information">
      <DynamicForm
        mode="react-hook-form"
        fields={fields}
        schema={personalInfoSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        layout="grid"
        gridColumns={12}
        submitButtonText="Update Profile"
        showSubmitButton={false}
        showCancelButton={false}
      />
    </Card>
  )
}

export default PersonalInfoTab
