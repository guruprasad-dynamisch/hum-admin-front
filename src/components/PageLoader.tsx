import { Box } from '@mui/material';
import CircularProgress, { circularProgressClasses, CircularProgressProps } from '@mui/material/CircularProgress';
import '@styles/PageLoader.css';

function CustomCircularProgress(props: CircularProgressProps) {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={(theme) => ({
        color: 'var(--primary-orange)',
        animationDuration: '550ms',
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      })}
      size={60}
      thickness={4}
      {...props}
    />
  );
}

const PageLoader = () => {
  return (
    <Box className="page-loader-container">
      <CustomCircularProgress />
    </Box>
  )
}

export default PageLoader
