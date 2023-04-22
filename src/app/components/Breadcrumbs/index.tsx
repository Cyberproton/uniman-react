import { Home } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const AppBreadcrumbs = props => {
  const { pathname } = useLocation();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="primary" href="/">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Home />
          <Typography mx={1}>
            {pathname === '/' ? 'Trang Chủ' : pathname}
          </Typography>
        </Box>
      </Link>
    </Breadcrumbs>
  );
};
