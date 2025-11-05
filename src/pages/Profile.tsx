import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Stack,
  Button,
  Checkbox,
  CircularProgress,
} from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { DynamicForm } from '@components/forms'
import { useToast } from '@hooks/use-toast'
import { profileSchema, ProfileFormData } from '@validations/profile-validations'
import { profileFields, profileDefaultValues } from '@constants/form-fields'
import ProfileImageUpload from '@components/ProfileImageUpload'
import { getUserInfoRequest } from '@api/user'
import { UserInfoResponse } from '@models/api-types'
import "@styles/pages/Profile.css";
import PageLoader from '@components/PageLoader'

export default function Profile() {
  const { showSuccess, showError, showInfo } = useToast()

  // State management
  const [profileImage, setProfileImage] = useState<string>('')
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [includeSources, setIncludeSources] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formValues, setFormValues] = useState(profileDefaultValues)

  // Fetch user info on mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true)
        const response = await getUserInfoRequest()
        if (response.data.success && response.data.data) {
          const userData = response.data.data
          setUserInfo(userData)
          // Update form values with fetched data
          setFormValues({
            fullName: userData.fullName || '',
            email: userData.email || '',
            phoneNumber: userData.phone || '',
            organizationName: userData.organization?.name || '',
          })
        }
      } catch (error: any) {
        showError(error.response?.data?.message || 'Failed to fetch user information')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  // Handle form submission
  const handleSubmit = async (data: ProfileFormData) => {
    console.log('Profile Data:', data)
    showSuccess('Profile updated successfully!')
    setIsEditMode(false)
  }

  // Handle profile image upload
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result as string)
      showSuccess('Profile image updated!')
    }
    reader.readAsDataURL(file)
  }

  // Handle profile image removal
  const handleImageRemove = () => {
    setProfileImage('')
    showInfo('Profile image removed')
  }

  // Handle theme toggle
  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme)
    // In a real app, you would update the theme context/provider here
    showInfo(`Switched to ${!isDarkTheme ? 'Dark' : 'Light'} theme`)
  }

  // Show loading state
  if (isLoading) {
    return (
      <PageLoader />
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100%',
        bgcolor: 'var(--bg-main)',
        p: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4 },
      }}
    >
      {/* Header - No Card */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: 'var(--text-white)',
            fontWeight: 500,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          My Account
        </Typography>
        <Button
          size="small"
          onClick={() => showInfo('Delete Account clicked')}
          sx={{
            color: 'var(--primary-gold)',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            '&:hover': { color: 'var(--primary-orange)', background: 'transparent' },
          }}
        >
          Delete Account
        </Button>
      </Stack>

      {/* Profile Image and Form Card */}
      <Card
        variant="outlined"
        sx={{
          bgcolor: 'var(--bg-sidebar)',
          borderColor: 'var(--border-default)',
          mb: 3,
          borderRadius: 2,
          border: 'none',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3, md: 0 }}
            sx={{ width: '100%' }}
          >
            {/* Left Side - Profile Image (40%) */}
            <Box
              sx={{
                width: { xs: '100%', md: '40%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pr: { xs: 0, md: 3 },
                borderRight: { xs: 'none', md: '1px solid var(--border-default)' },
                pb: { xs: 3, md: 0 },
                borderBottom: { xs: '1px solid var(--border-default)', md: 'none' },
              }}
            >
              <ProfileImageUpload
                image={profileImage}
                userName={userInfo?.fullName || formValues.fullName}
                onImageUpload={handleImageUpload}
                onImageRemove={handleImageRemove}
                onError={showError}
                size={160}
              />
            </Box>

            {/* Right Side - Profile Form (60%) */}
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                pl: { xs: 0, md: 3 },
              }}
            >
              <DynamicForm
                mode="react-hook-form"
                fields={profileFields.map(field => ({
                  ...field,
                  disabled: field.name === 'email' || field.name === 'phoneNumber' ? true : !isEditMode
                }))}
                schema={profileSchema}
                defaultValues={formValues}
                onSubmit={handleSubmit}
                submitButtonText="Save Profile"
                showSubmitButton={isEditMode}
                submitButtonSize="small"
                cancelButtonText="Cancel"
                showCancelButton={isEditMode}
                onCancel={() => setIsEditMode(false)}
                layout="grid"
                fieldSpacing={2.5}
              />

              {/* Edit Profile Link */}
              {!isEditMode && (
                <Box sx={{ mt: 3, mr: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => setIsEditMode(true)}
                    sx={{
                      color: 'var(--primary-gold)',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textDecoration: 'underline',
                      '&:hover': {
                        color: 'var(--primary-orange)',
                        background: 'transparent',
                        textDecoration: 'underline'
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Share Preferences Card */}
      <Card
        variant="outlined"
        sx={{
          bgcolor: 'var(--bg-sidebar)',
          borderColor: 'var(--border-default)',
          mb: 3,
          borderRadius: 2,
          border: 'none',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant="subtitle1"
            sx={{ color: 'var(--text-white)', fontWeight: 600, mb: 2 }}
          >
            Share Preferences
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSources}
                onChange={(_, v) => setIncludeSources(v)}
                sx={{
                  color: 'var(--text-secondary)',
                  '&.Mui-checked': { color: 'var(--primary-orange)' },
                }}
              />
            }
            label={<Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>Include sources</Typography>}
          />
        </CardContent>
      </Card>

      {/* Application Theme Card */}
      <Card
        variant="outlined"
        sx={{
          bgcolor: 'var(--bg-sidebar)',
          borderColor: 'var(--border-default)',
          borderRadius: 2,
          border: 'none',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant="subtitle1"
            sx={{ color: 'var(--text-white)', fontWeight: 600, mb: 2 }}
          >
            Application Theme
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button
              onClick={() => { if (!isDarkTheme) { setIsDarkTheme(true); showInfo('Switched to Dark theme') } }}
              startIcon={<Brightness4 />}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: isDarkTheme ? 'var(--primary-orange)' : 'transparent',
                color: isDarkTheme ? '#000' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: isDarkTheme ? 'var(--primary-orange)' : 'var(--border-default)',
                '& .MuiSvgIcon-root': { color: isDarkTheme ? '#000' : 'var(--text-secondary)' },
                '&:hover': {
                  bgcolor: isDarkTheme ? 'var(--primary-orange)' : 'rgba(255,255,255,0.04)'
                }
              }}
            >
              Dark
            </Button>
            <Button
              onClick={() => { if (isDarkTheme) { setIsDarkTheme(false); showInfo('Switched to Light theme') } }}
              startIcon={<Brightness7 />}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: !isDarkTheme ? 'var(--primary-orange)' : 'transparent',
                color: !isDarkTheme ? '#000' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: !isDarkTheme ? 'var(--primary-orange)' : 'var(--border-default)',
                '& .MuiSvgIcon-root': { color: !isDarkTheme ? '#000' : 'var(--text-secondary)' },
                '&:hover': {
                  bgcolor: !isDarkTheme ? 'var(--primary-orange)' : 'rgba(255,255,255,0.04)'
                }
              }}
            >
              Light
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
