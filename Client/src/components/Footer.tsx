import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'orange', color: '#fff', mt:".5rem", p:2 ,textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} BlogApp. All rights reserved. Developed by Kedevs
      </Typography>
    </Box>
  );
}

export default Footer;

