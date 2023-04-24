import { Box, Typography } from '@mui/material';

export const HomePage = props => {
  const username = localStorage.getItem('username');

  return (
    <Box>
      <Typography variant="h4" textAlign={'center'} fontWeight={'bold'}>
        Chào mừng đến với UniMan
      </Typography>
      <Typography my={3} variant="h5" textAlign={'center'}>
        Bạn là {username}
      </Typography>
    </Box>
  );
};
