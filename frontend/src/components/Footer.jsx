// src/components/Footer.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2, // vertical padding
        px: 2, // horizontal padding
        mt: 'auto', // useful when using flex layouts to push footer to the bottom
        backgroundColor: (theme) => theme.palette.grey[200],
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; 2025 Quorum. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
