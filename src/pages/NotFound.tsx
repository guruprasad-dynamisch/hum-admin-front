import { Link } from 'react-router-dom'
import { Box, Typography, Button, Container, Stack } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import { getRouteByKey } from '@utils/helpers'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        {/* 404 Illustration */}
        <Box
          sx={{
            position: 'relative',
            mb: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '120px', sm: '180px', md: '220px' },
              fontWeight: 700,
              color: 'var(--primary-orange)',
              opacity: 0.1,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            404
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SearchOffIcon
              sx={{
                fontSize: { xs: '80px', sm: '100px', md: '120px' },
                color: 'var(--primary-orange)',
              }}
            />
          </Box>
        </Box>

        {/* Error Message */}
        <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'var(--text-white)',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              fontSize: { xs: '0.95rem', sm: '1rem' },
              px: 2,
            }}
          >
            The page you are looking for doesn't exist or you don't have permission to access it.
            It might have been moved or deleted.
          </Typography>
        </Stack>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ width: { xs: '100%', sm: 'auto' }, px: 2 }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon style={{ color: 'var(--text-black) !important' }} />}
            component={Link}
            to={getRouteByKey('discoveries')}
            sx={{
              bgcolor: 'var(--primary-orange)',
              color: 'var(--text-black) !important',
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'var(--primary-gold)',
                color: 'var(--text-black) !important'
              },
            }}
          >
            Go to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
