import React, { useRef } from 'react';
import { Box, Avatar, IconButton, Tooltip } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';

interface ProfileImageUploadProps {
  /** Current profile image URL */
  image?: string;
  /** User's display name for initials */
  userName?: string;
  /** Callback when image is uploaded */
  onImageUpload: (file: File) => void;
  /** Callback when image is removed */
  onImageRemove: () => void;
  /** Maximum file size in bytes (default: 5MB) */
  maxSize?: number;
  /** Avatar size in pixels (default: 120) */
  size?: number;
  /** Show error callback */
  onError?: (message: string) => void;
}

/**
 * ProfileImageUpload Component
 * 
 * A reusable component for uploading and managing profile images.
 * Features:
 * - Upload image with camera icon
 * - Delete image with delete icon
 * - Display user initials when no image
 * - File size validation
 * - Responsive sizing
 * 
 * @example
 * ```tsx
 * <ProfileImageUpload
 *   image={profileImage}
 *   userName="John Doe"
 *   onImageUpload={handleImageUpload}
 *   onImageRemove={handleImageRemove}
 *   onError={showError}
 * />
 * ```
 */
const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  image,
  userName = 'User',
  onImageUpload,
  onImageRemove,
  maxSize = 5 * 1024 * 1024, // 5MB default
  size = 120,
  onError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user initials from name
  const getUserInitials = (name: string): string => {
    if (!name || name.trim().length === 0) {
      return 'U';
    }

    const names = name.trim().split(' ').filter(n => n.length > 0);

    if (names.length >= 2 && names[0]?.[0] && names[1]?.[0]) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }

    if (names[0] && names[0].length >= 2) {
      return names[0].substring(0, 2).toUpperCase();
    }

    return names[0]?.[0]?.toUpperCase() ?? 'U';
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > maxSize) {
        const sizeMB = Math.round(maxSize / (1024 * 1024));
        onError?.(`Image size should be less than ${sizeMB}MB`);
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        onError?.('Please select a valid image file');
        return;
      }

      onImageUpload(file);
    }

    // Reset input value to allow re-uploading the same file
    if (event.target) {
      event.target.value = '';
    }
  };

  // Calculate responsive sizes
  const avatarSize = {
    xs: Math.round(size * 0.83), // 100px for 120px base
    sm: size,
  };

  const iconButtonSize = {
    xs: Math.round(size * 0.3), // 36px for 120px base
    sm: Math.round(size * 0.33), // 40px for 120px base
  };

  const iconSize = {
    xs: '1.25rem',
    sm: '1.5rem',
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        {/* Avatar */}
        <Avatar
          src={image}
          sx={{
            width: avatarSize,
            height: avatarSize,
            bgcolor: 'var(--primary-orange)',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 600,
            border: {
              xs: '3px solid var(--border-default)',
              sm: '4px solid var(--border-default)',
            },
          }}
        >
          {!image && getUserInitials(userName)}
        </Avatar>

        {/* Upload Button */}
        <Tooltip title="Upload photo" placement="top">
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              bgcolor: 'var(--primary-orange)',
              color: '#000',
              '&:hover': {
                bgcolor: 'var(--primary-gold)',
              },
              width: iconButtonSize,
              height: iconButtonSize,
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <PhotoCamera sx={{ fontSize: iconSize }} />
          </IconButton>
        </Tooltip>

        {/* Delete Button (only show if image exists) */}
        {image && (
          <Tooltip title="Remove photo" placement="top">
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                bgcolor: 'var(--error-red)',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#c62828',
                },
                width: iconButtonSize,
                height: iconButtonSize,
              }}
              onClick={onImageRemove}
            >
              <Delete sx={{ fontSize: iconSize }} />
            </IconButton>
          </Tooltip>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
};

export default ProfileImageUpload;
