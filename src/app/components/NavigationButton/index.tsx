import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const secondaryGray = createTheme({
  palette: { secondary: { main: '#333333' } },
});

export const NavigationButton = props => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = props.path;

  return (
    <ThemeProvider theme={secondaryGray}>
      <Button
        sx={{ mx: 1, p: 0.7 }}
        color={pathname === path ? 'primary' : 'secondary'}
        onClick={() => navigate(path)}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
};

export const NavigationIconButton = props => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = props.path;

  return (
    <IconButton
      sx={{ mx: 1 }}
      color={pathname === path ? 'primary' : undefined}
      onClick={() => navigate(path)}
    >
      {props.children}
    </IconButton>
  );
};
