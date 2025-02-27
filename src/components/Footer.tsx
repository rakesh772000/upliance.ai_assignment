
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '10px', textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="body2">© {new Date().getFullYear()} React App. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;