import { CircularProgress, Typography } from '@mui/material';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <CircularProgress color="primary" size={40} thickness={4} />
        <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
          Loading...
        </Typography>
      </div>
    </div>
  );
};

export default Loader;
