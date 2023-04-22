import { More, PersonRounded, School } from '@mui/icons-material';
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

export function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent">
      <Container>
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
            <NavigationButton path="/products">Sinh viên</NavigationButton>
            <NavigationIconButton path="/user">
              <PersonRounded fontSize="large" />
            </NavigationIconButton>
            <NavigationIconButton path="/logout">
              <PersonRounded fontSize="large" />
            </NavigationIconButton>
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
      </Container>
    </AppBar>
  );
}
