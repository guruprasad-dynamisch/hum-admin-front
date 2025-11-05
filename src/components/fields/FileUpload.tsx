import { Box, Typography } from '@mui/material';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { useState, useRef, useCallback } from 'react';

interface FileUploadProps<T extends FieldValues = FieldValues> {
  /** Label for the upload area */
  label?: string;
  /** Accept file types (e.g., ".pdf,.doc,.docx") */
  accept?: string;
  /** Whether multiple files can be selected */
  multiple?: boolean;
  /** Whether drag and drop is enabled */
  enableDragDrop?: boolean;
  /** Custom button component to render */
  buttonComponent?: React.ReactNode;
  /** Change handler (standalone mode) */
  onChange?: (files: File[]) => void;
  /** Whether the upload is disabled */
  disabled?: boolean;
  /** Custom styling for the container */
  sx?: object;
  /** React Hook Form mode */
  mode?: 'standalone' | 'react-hook-form';
  /** React Hook Form control */
  control?: Control<T>;
  /** React Hook Form name */
  name?: Path<T>;
  /** React Hook Form rules */
  rules?: any;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Custom error message */
  errorMessage?: string;
}

function FileUpload<T extends FieldValues = FieldValues>({
  label = 'Upload files',
  accept,
  multiple = false,
  enableDragDrop = false,
  buttonComponent,
  onChange,
  disabled = false,
  sx = {},
  mode = 'standalone',
  control,
  name,
  rules,
  maxSize,
  errorMessage,
}: FileUploadProps<T>) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Hook Form integration
  const isReactHookForm = mode === 'react-hook-form' && control && name;
  let fieldProps: any = {};
  let fieldError = null;

  if (isReactHookForm) {
    const {
      field: { onChange: fieldOnChange, value: fieldValue },
      fieldState: { error: rhfError },
    } = useController({
      name: name!,
      control,
      rules,
      defaultValue: [] as any,
    });

    fieldProps = {
      value: fieldValue || [],
      onChange: fieldOnChange,
    };
    fieldError = rhfError;
  }

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    // Validate file size if maxSize is specified
    if (maxSize) {
      const oversizedFiles = fileArray.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        const sizeInMB = (maxSize / (1024 * 1024)).toFixed(2);
        setError(`File size must be less than ${sizeInMB}MB`);
        return;
      }
    }

    setError(null);

    if (isReactHookForm) {
      fieldProps.onChange(fileArray);
    } else {
      onChange?.(fileArray);
    }
  }, [maxSize, isReactHookForm, fieldProps, onChange]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop || disabled) return;
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop || disabled) return;
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop || disabled) return;
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const displayError = error || errorMessage || fieldError?.message;

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        disabled={disabled}
        style={{ display: 'none' }}
      />

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          ...(enableDragDrop && {
            border: isDragging 
              ? '2px dashed var(--primary-orange)' 
              : '2px dashed transparent',
            backgroundColor: isDragging 
              ? 'var(--primary-orange-light)' 
              : 'transparent',
            borderRadius: '8px',
            padding: '24px',
          }),
        }}
      >
        {buttonComponent || (
          <Typography
            sx={{
              color: 'var(--primary-orange)',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {label}
          </Typography>
        )}

        {enableDragDrop && isDragging && (
          <Typography
            sx={{
              color: 'var(--text-secondary)',
              fontSize: '12px',
              marginTop: 1,
            }}
          >
            Drop files here
          </Typography>
        )}
      </Box>

      {displayError && (
        <Typography
          sx={{
            color: 'var(--error-red)',
            fontSize: '12px',
            marginTop: 1,
            textAlign: 'center',
          }}
        >
          {displayError}
        </Typography>
      )}
    </Box>
  );
}

export default FileUpload;
