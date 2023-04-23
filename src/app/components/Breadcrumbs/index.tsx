import { Home } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Typography, colors } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const AppBreadcrumbs = props => {
  const { pathname } = useLocation();
  const names = props.names;

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Home color="primary" />
        <Typography mx={1} color={'primary'}>
          {names[pathname] == null ? pathname : names[pathname]}
        </Typography>
      </Box>
    </Breadcrumbs>
  );
};
