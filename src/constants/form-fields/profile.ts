import { FieldConfig } from '@components/forms';
import { ProfileFormData } from '@validations/profile-validations';

/**
 * Profile form field configuration
 */
export const profileFields: FieldConfig[] = [
  {
    type: 'text',
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    colSpan: 6,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    disabled: true,
    colSpan: 6,
  },
  {
    type: 'phone',
    name: 'phoneNumber',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    required: true,
    disabled: true,
    defaultCountry: 'US',
    colSpan: 6,
  },
  {
    type: 'text',
    name: 'organizationName',
    label: 'Organization Name',
    placeholder: 'Enter your organization',
    required: true,
    colSpan: 6,
  },
];

/**
 * Default values for the profile form
 */
export const profileDefaultValues: Partial<ProfileFormData> = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+12345678900',
  organizationName: 'Humanistics AI',
};
