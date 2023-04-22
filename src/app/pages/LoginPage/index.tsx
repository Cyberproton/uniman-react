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
import { AppTitle } from 'app/components/AppTitle';
import { login } from 'app/data';
import { useState } from 'react';

export const LoginPage = props => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

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
                onClick={() => login(username!, password!)}
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
