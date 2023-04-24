import {
  LogoutRounded,
  More,
  PersonRounded,
  School,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavigationButton, NavigationIconButton } from '../NavigationButton';
import { logout } from 'app/api';

export function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent">
      <Box mx={3}>
        <Toolbar disableGutters>
          <Button
            size="large"
            color="inherit"
            onClick={() => navigate('/')}
            startIcon={<School fontSize="large" />}
            sx={{ mr: 2 }}
          >
            UniMan
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <NavigationButton path="/">Trang Chủ</NavigationButton>
            <NavigationButton path="/transcripts">Bảng điểm</NavigationButton>
            <NavigationButton path="/user">Sinh viên</NavigationButton>
            <IconButton
              sx={{ mx: 1 }}
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
            >
              <LogoutRounded fontSize="large" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <More />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
