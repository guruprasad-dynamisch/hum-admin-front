import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import ChipsInput, { ChipsInputProps, ChipItem } from './ChipsInput'

interface ChipsFieldProps<T extends FieldValues> extends Omit<ChipsInputProps, 'value' | 'onChange' | 'error'> {
  name: Path<T>
  control: Control<T>
  defaultValue?: string[] | ChipItem[]
}

/**
 * ChipsField - React Hook Form wrapper for ChipsInput
 * 
 * @example
 * // Basic usage with validation
 * <ChipsField
 *   name="emails"
 *   control={control}
 *   label="Email Addresses"
 *   type="email"
 *   required
 * />
 * 
 * @example
 * // With custom validation
 * <ChipsField
 *   name="tags"
 *   control={control}
 *   label="Tags"
 *   validation={(value) => value.length >= 3}
 *   errorMessage="Tag must be at least 3 characters"
 * />
 */
function ChipsField<T extends FieldValues>({
  name,
  control,
  defaultValue = [],
  ...props
}: ChipsFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as any}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <ChipsInput
          {...props}
          name={name}
          value={value || []}
          onChange={onChange}
          error={error}
        />
      )}
    />
  )
}

export default ChipsField
