import { Checkbox, FormControlLabel, FormHelperText, Box } from '@mui/material';
import { useController, Control, FieldValues, Path } from 'react-hook-form';

interface CheckboxFieldProps<T extends FieldValues = FieldValues> {
  /** Label text for the checkbox */
  label?: string;
  /** Whether the checkbox is checked (standalone mode) */
  checked?: boolean;
  /** Change handler (standalone mode) */
  onChange?: (checked: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Custom styling for the container */
  sx?: object;
  /** Custom styling for the checkbox */
  checkboxSx?: object;
  /** React Hook Form mode */
  mode?: 'standalone' | 'react-hook-form';
  /** React Hook Form control */
  control?: Control<T>;
  /** React Hook Form name */
  name?: Path<T>;
  /** React Hook Form rules */
  rules?: any;
  /** Size of the checkbox */
  size?: 'small' | 'medium';
  /** Custom icon for unchecked state */
  icon?: React.ReactNode;
  /** Custom icon for checked state */
  checkedIcon?: React.ReactNode;
}

function CheckboxField<T extends FieldValues = FieldValues>({
  label,
  checked,
  onChange,
  disabled = false,
  sx = {},
  checkboxSx = {},
  mode = 'standalone',
  control,
  name,
  rules,
  size = 'medium',
  icon,
  checkedIcon,
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

  const checkboxElement = (
    <Checkbox
      checked={isReactHookForm ? fieldProps.checked : checked}
      onChange={handleChange}
      disabled={disabled}
      size={size}
      icon={icon}
      checkedIcon={checkedIcon}
      sx={{
        color: 'var(--border-default)',
        '&.Mui-checked': {
          color: 'var(--primary-orange)',
        },
        '&:hover': {
          backgroundColor: 'var(--bg-hover)',
        },
        '&.Mui-disabled': {
          color: 'var(--text-muted)',
        },
        ...checkboxSx,
      }}
      {...(isReactHookForm ? { inputRef: fieldProps.ref, onBlur: fieldProps.onBlur } : {})}
    />
  );

  if (label) {
    return (
      <Box sx={sx}>
        <FormControlLabel
          control={checkboxElement}
          label={label}
          disabled={disabled}
          sx={{
            color: 'var(--text-white)',
            '& .MuiFormControlLabel-label': {
              fontSize: '14px',
              color: 'var(--text-white)',
            },
            '& .MuiFormControlLabel-label.Mui-disabled': {
              color: 'var(--text-muted)',
            },
          }}
        />
        {error && (
          <FormHelperText sx={{ color: 'var(--error-red)', ml: 2 }}>
            {error.message}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      {checkboxElement}
      {error && (
        <FormHelperText sx={{ color: 'var(--error-red)' }}>
          {error.message}
        </FormHelperText>
      )}
    </Box>
  );
}

export default CheckboxField;
