import React from 'react';
import { Form } from 'react-bootstrap';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@utils/classNames';
import '@styles/fields/checkbox-field.scss';

interface CheckboxFieldProps<T extends FieldValues = FieldValues> {
  /** Label text or React node for the checkbox */
  label?: React.ReactNode;
  /** Whether the checkbox is checked (standalone mode) */
  checked?: boolean;
  /** Change handler (standalone mode) */
  onChange?: (checked: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Custom className for the wrapper */
  className?: string;
  /** React Hook Form mode */
  mode?: 'standalone' | 'react-hook-form';
  /** React Hook Form control */
  control?: Control<T>;
  /** React Hook Form name */
  name?: Path<T>;
  /** React Hook Form rules */
  rules?: any;
  /** Checkbox ID */
  id?: string;
  /** Whether field is required */
  required?: boolean;
}

function CheckboxField<T extends FieldValues = FieldValues>({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  mode = 'standalone',
  control,
  name,
  rules,
  id,
  required = false,
}: CheckboxFieldProps<T>) {
  // React Hook Form integration
  const isReactHookForm = mode === 'react-hook-form' && control && name;
  let fieldProps: any = {};
  let error = null;

  if (isReactHookForm) {
    const {
      field: { onChange: fieldOnChange, onBlur: fieldOnBlur, value: fieldValue, ref: fieldRef },
      fieldState: { error: fieldError },
    } = useController({
      name: name!,
      control,
      rules,
      defaultValue: false as any,
    });

    fieldProps = {
      ref: fieldRef,
      checked: fieldValue || false,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => fieldOnChange(e.target.checked),
      onBlur: fieldOnBlur,
    };
    error = fieldError;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isReactHookForm) {
      fieldProps.onChange(event);
    } else {
      onChange?.(event.target.checked);
    }
  };

  // Standalone mode props
  const standaloneProps = !isReactHookForm ? {
    checked: checked || false,
    onChange: handleChange,
  } : {};

  return (
    <div className={cn('checkbox-field-wrapper', className)}>
      <div className="checkbox-field-container">
        <Form.Check
          type="checkbox"
          id={id || name}
          disabled={disabled}
          isInvalid={!!error}
          label={label}
          {...(isReactHookForm ? fieldProps : standaloneProps)}
        />
      </div>
      {error && (
        <span className="error-feedback">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default CheckboxField;
