import { AccountCircle, Lock } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { login } from 'app/api';
import { AppTitle } from 'app/components/AppTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = props => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3} width={'30%'}>
          <AppTitle center={true} my={5} />
          <Typography variant="h5" align="center" my={3}>
            Login
          </Typography>
          <Box component={'form'}>
            <TextField
              label={'Username'}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              label={'Password'}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              onChange={e => setPassword(e.target.value)}
            />
            <Box my={3} textAlign={'center'}>
              <Button
                variant="contained"
                onClick={() => {
                  if (username == null || password == null) {
                    return;
                  }

                  login(username, password).then(
                    () => navigate('/'),
                    err => alert(err.response.data.message),
                  );
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
